"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { company } from "@/lib/company";

const FORMSUBMIT_URL = `https://formsubmit.co/ajax/${encodeURIComponent(company.email)}`;

const Turnstile = dynamic(
  () => import("@marsidev/react-turnstile").then((m) => m.Turnstile),
  { ssr: false }
);

const TURNSTILE_TEST_KEY = "1x00000000000000000000AA";
const isTestKey = () => {
  const key = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  return !key || key === TURNSTILE_TEST_KEY;
};

export interface LeadFormPrefill {
  type?: string;
  pindala_m2?: string;
  paksus_mm?: string;
  konstruktsioon?: string;
  maht_m3?: string;
  pinna_tyyp?: string;
  ettevalmistus?: string;
  thermograafia?: boolean;
}

interface LeadFormProps {
  prefill?: LeadFormPrefill;
  className?: string;
  maxImages?: number;
}

const INITIAL = {
  name: "",
  email: "",
  phone: "",
  message: "",
  turnstileToken: "",
  thermograafia: false,
};

export function LeadForm({ prefill = {}, className, maxImages = 6 }: LeadFormProps) {
  const [form, setForm] = useState({
    ...INITIAL,
    ...prefill,
    thermograafia: prefill.thermograafia ?? INITIAL.thermograafia,
  });
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    },
    []
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const chosen = Array.from(e.target.files ?? []);
      setFiles((prev) => [...prev, ...chosen].slice(0, maxImages));
    },
    [maxImages]
  );

  const removeFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setStatus("submitting");
      setErrorMessage("");
      try {
        const body = new FormData();
        body.append("name", form.name);
        body.append("email", form.email);
        body.append("phone", form.phone ?? "");
        body.append("message", form.message);
        body.append("_subject", "Pinnakatted.ee – uus päring");
        body.append("_replyto", form.email);
        body.append("_template", "table");
        body.append("_captcha", "false");
        body.append("Termograafia soov", form.thermograafia ? "Jah" : "Ei");
        if (prefill.type) body.append("Tüüp", prefill.type);
        if (prefill.pindala_m2) body.append("Pindala (m²)", prefill.pindala_m2);
        if (prefill.paksus_mm) body.append("Paksus (mm)", prefill.paksus_mm ?? "");
        if (prefill.konstruktsioon) body.append("Konstruktsioon", prefill.konstruktsioon ?? "");
        if (prefill.maht_m3) body.append("Maht (m³)", prefill.maht_m3 ?? "");
        if (prefill.pinna_tyyp) body.append("Pinna tüüp", prefill.pinna_tyyp ?? "");
        if (prefill.ettevalmistus) body.append("Ettevalmistus", prefill.ettevalmistus ?? "");
        files.forEach((f) => body.append("attachment", f));

        const res = await fetch(FORMSUBMIT_URL, { method: "POST", body });
        const data = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string };
        if (!res.ok || data.success === false) {
          setErrorMessage(data.message ?? "Midagi läks valesti. Proovi uuesti.");
          setStatus("error");
          return;
        }
        setStatus("success");
        setForm(INITIAL);
        setFiles([]);
      } catch {
        setErrorMessage("Võrgu viga. Proovi uuesti.");
        setStatus("error");
      }
    },
    [form, files, prefill]
  );

  if (status === "success") {
    return (
      <div
        className={cn(
          "rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center text-emerald-800",
          className
        )}
      >
        <h3 className="text-xl font-bold">Täname!</h3>
        <p className="mt-2">Päring on saadetud. Võtame ühendust lühikese aja jooksul.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-6", className)}>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="lead-name" className="block text-sm font-medium text-slate-700">
            Nimi *
          </label>
          <input
            id="lead-name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-primary-500 focus:ring-primary-500"
            autoComplete="name"
          />
        </div>
        <div>
          <label htmlFor="lead-email" className="block text-sm font-medium text-slate-700">
            E-mail *
          </label>
          <input
            id="lead-email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-primary-500 focus:ring-primary-500"
            autoComplete="email"
          />
        </div>
      </div>
      <div>
        <label htmlFor="lead-phone" className="block text-sm font-medium text-slate-700">
          Telefon
        </label>
        <input
          id="lead-phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-primary-500 focus:ring-primary-500"
          autoComplete="tel"
        />
      </div>
      <div className="flex items-start gap-3">
        <input
          id="lead-thermograafia"
          name="thermograafia"
          type="checkbox"
          checked={!!form.thermograafia}
          onChange={(e) => setForm((prev) => ({ ...prev, thermograafia: e.target.checked }))}
          className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
        />
        <label htmlFor="lead-thermograafia" className="text-sm font-medium text-slate-700">
          Soovin termograafiat (tasuline teenus, alates 250 € / objekt)
        </label>
      </div>
      <div>
        <label htmlFor="lead-message" className="block text-sm font-medium text-slate-700">
          Sõnum *
        </label>
        <textarea
          id="lead-message"
          name="message"
          required
          rows={4}
          value={form.message}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-primary-500 focus:ring-primary-500"
          placeholder="Kirjelda objekti ja soovitud tööd..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">
          Pildid (valikuline, max {maxImages})
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="mt-1 block w-full text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-primary-50 file:px-4 file:py-2 file:text-primary-700 file:hover:bg-primary-100"
        />
        {files.length > 0 && (
          <ul className="mt-2 flex flex-wrap gap-2">
            {files.map((f, i) => (
              <li key={i} className="flex items-center gap-1 rounded bg-slate-100 px-2 py-1 text-sm">
                {f.name}
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  className="text-slate-500 hover:text-slate-700"
                  aria-label="Eemalda"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex justify-center">
        <Turnstile
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? TURNSTILE_TEST_KEY}
          onSuccess={(token) => setForm((prev) => ({ ...prev, turnstileToken: token }))}
          onExpire={() => setForm((prev) => ({ ...prev, turnstileToken: "" }))}
          options={{
            theme: "light",
            size: "normal",
          }}
        />
      </div>

      {errorMessage && (
        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{errorMessage}</p>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full min-h-[48px] sm:w-auto"
        disabled={status === "submitting" || (!isTestKey() && !form.turnstileToken)}
      >
        {status === "submitting" ? "Saadan..." : "Saada päring"}
      </Button>
    </form>
  );
}
