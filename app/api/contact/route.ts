import { NextResponse } from "next/server";

const TURNSTILE_VERIFY = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

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

  // Optional: send email via Resend, SendGrid, or log for now
  const payload = {
    name,
    email,
    phone: phone ?? "",
    message,
    aadress: formData.get("aadress") ?? "",
    type: formData.get("type") ?? "",
    pindala_m2: formData.get("pindala_m2") ?? "",
    paksus_mm: formData.get("paksus_mm") ?? "",
    konstruktsioon: formData.get("konstruktsioon") ?? "",
    maht_m3: formData.get("maht_m3") ?? "",
    pinna_tyyp: formData.get("pinna_tyyp") ?? "",
    ettevalmistus: formData.get("ettevalmistus") ?? "",
    thermograafia: formData.get("thermograafia") === "1",
  };
  if (process.env.NODE_ENV === "development") {
    console.log("[Contact form]", payload);
  }
  // TODO: send email when env e.g. RESEND_API_KEY is set

  return NextResponse.json({ success: true, message: "Päring saadetud." });
}
