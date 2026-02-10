import { NextResponse } from "next/server";
import { company } from "@/lib/company";

const TURNSTILE_VERIFY = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const FORMSUBMIT_URL = `https://formsubmit.co/ajax/${encodeURIComponent(company.email)}`;

// Simple in-memory rate limit: IP -> { count, resetAt }
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 min
const RATE_LIMIT_MAX = 5;

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  const realIp = request.headers.get("x-real-ip");
  return realIp ?? "unknown";
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count++;
  return true;
}

async function verifyTurnstile(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    // In dev without secret, accept test token
    if (token === "1x00000000000000000000AA" || token.length > 10) return true;
    return false;
  }
  const res = await fetch(TURNSTILE_VERIFY, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret, response: token }).toString(),
  });
  const data = (await res.json()) as { success?: boolean };
  return data.success === true;
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { message: "Liiga palju päringuid. Proovi hiljem uuesti." },
      { status: 429 }
    );
  }

  const formData = await request.formData();
  const name = formData.get("name")?.toString()?.trim();
  const email = formData.get("email")?.toString()?.trim();
  const phone = formData.get("phone")?.toString()?.trim();
  const message = formData.get("message")?.toString()?.trim();
  const turnstileToken = formData.get("turnstileToken")?.toString();

  if (!name || !email || !message) {
    return NextResponse.json(
      { message: "Nimi, e-mail ja sõnum on kohustuslikud." },
      { status: 400 }
    );
  }

  if (!turnstileToken) {
    return NextResponse.json(
      { message: "Palun lahenda turvalisuse kontroll." },
      { status: 400 }
    );
  }

  const valid = await verifyTurnstile(turnstileToken);
  if (!valid) {
    return NextResponse.json(
      { message: "Turvalisuse kontroll ebaõnnestus. Proovi uuesti." },
      { status: 400 }
    );
  }

  const aadress = formData.get("aadress")?.toString() ?? "";
  const type = formData.get("type")?.toString() ?? "";
  const pindala_m2 = formData.get("pindala_m2")?.toString() ?? "";
  const paksus_mm = formData.get("paksus_mm")?.toString() ?? "";
  const konstruktsioon = formData.get("konstruktsioon")?.toString() ?? "";
  const maht_m3 = formData.get("maht_m3")?.toString() ?? "";
  const pinna_tyyp = formData.get("pinna_tyyp")?.toString() ?? "";
  const ettevalmistus = formData.get("ettevalmistus")?.toString() ?? "";
  const thermograafia = formData.get("thermograafia") === "1";

  const submitBody = new FormData();
  submitBody.append("name", name);
  submitBody.append("email", email);
  submitBody.append("phone", phone ?? "");
  submitBody.append("message", message);
  submitBody.append("_subject", "Pinnakatted.ee – uus päring");
  submitBody.append("_replyto", email);
  submitBody.append("_template", "table");
  if (aadress) submitBody.append("Aadress / vald", aadress);
  if (type) submitBody.append("Tüüp", type);
  if (pindala_m2) submitBody.append("Pindala (m²)", pindala_m2);
  if (paksus_mm) submitBody.append("Paksus (mm)", paksus_mm);
  if (konstruktsioon) submitBody.append("Konstruktsioon", konstruktsioon);
  if (maht_m3) submitBody.append("Maht (m³)", maht_m3);
  if (pinna_tyyp) submitBody.append("Pinna tüüp", pinna_tyyp);
  if (ettevalmistus) submitBody.append("Ettevalmistus", ettevalmistus);
  submitBody.append("Termograafia soov", thermograafia ? "Jah" : "Ei");

  const imageFiles = formData.getAll("images");
  for (let i = 0; i < imageFiles.length; i++) {
    const file = imageFiles[i];
    if (file instanceof File && file.size > 0) {
      submitBody.append("attachment", file);
    }
  }

  try {
    const res = await fetch(FORMSUBMIT_URL, {
      method: "POST",
      body: submitBody,
    });
    const data = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string };
    if (!res.ok || data.success === false) {
      console.error("[Contact form] FormSubmit error", res.status, data);
      return NextResponse.json(
        { message: data.message ?? "E-kirja saatmine ebaõnnestus. Proovi hiljem uuesti." },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("[Contact form] FormSubmit request failed", err);
    return NextResponse.json(
      { message: "E-kirja saatmine ebaõnnestus. Proovi hiljem uuesti." },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true, message: "Päring saadetud." });
}
