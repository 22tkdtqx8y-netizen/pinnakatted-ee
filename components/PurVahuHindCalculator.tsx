"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { company } from "@/lib/company";
import { PUR_VAHU_HINNAD } from "@/content/purHinnad";
import { useLocale } from "@/lib/LocaleContext";
import { getMessages } from "@/messages";

const Turnstile = dynamic(
  () => import("@marsidev/react-turnstile").then((m) => m.Turnstile),
  { ssr: false }
);

const PINDALA_MIN = 10;
const PINDALA_MAX = 500;
const PINDALA_DEFAULT = 100;
const PAKSUS_MIN = 50;
const PAKSUS_MAX = 300;
const PAKSUS_DEFAULT = 150;
const VARU_PERCENT_MIN = 10;
const VARU_PERCENT_MAX = 20;
const VARU_PERCENT = 20; // display default

const KONSTRUKTSIOON_OPTIONS = [
  { value: "sein", Icon: IconWall },
  { value: "katusealune", Icon: IconRoof },
  { value: "porand", Icon: IconFloor },
  { value: "vundament-sokkel", Icon: IconFoundation },
] as const;

function IconRoof({ className }: { className?: string }) {
  return (
    <svg className={cn("h-6 w-6", className)} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  );
}
function IconWall({ className }: { className?: string }) {
  return (
    <svg className={cn("h-6 w-6", className)} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M3.75 9h16.5m-16.5 4.5h16.5M3.75 3.75v16.5h16.5V3.75H3.75z" />
    </svg>
  );
}
function IconFoundation({ className }: { className?: string }) {
  return (
    <svg className={cn("h-6 w-6", className)} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75V21h19.5v-2.25M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12m-9-5.25v-3.75a2.25 2.25 0 012.25-2.25h6.75A2.25 2.25 0 0121 8.25v3.75" />
    </svg>
  );
}
function IconFloor({ className }: { className?: string }) {
  return (
    <svg className={cn("h-6 w-6", className)} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M3.75 12h16.5M3.75 3h16.5M3 3.75v16.5h18V3.75" />
    </svg>
  );
}
function IconClosedCell({ className }: { className?: string }) {
  return (
    <svg className={cn("h-6 w-6", className)} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
function IconOpenCell({ className }: { className?: string }) {
  return (
    <svg className={cn("h-6 w-6", className)} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    </svg>
  );
}
function IconInjection({ className }: { className?: string }) {
  return (
    <svg className={cn("h-6 w-6", className)} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

const VAHU_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  "suletud-pooridega": IconClosedCell,
  "avatud-pooriga": IconOpenCell,
  sustitav: IconInjection,
};

function CountUp({ value, duration = 400, decimals = 0 }: { value: number; duration?: number; decimals?: number }) {
  const [display, setDisplay] = useState(value);
  const prevRef = useRef(value);
  useEffect(() => {
    const start = prevRef.current;
    prevRef.current = value;
    const startTime = performance.now();
    let raf: number;
    const step = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = 1 - (1 - t) ** 2;
      const current = start + (value - start) * eased;
      setDisplay(Number(current.toFixed(decimals)));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value, duration, decimals]);
  return <span>{display}</span>;
}

const VUNDAMENT_VALUE = "vundament-sokkel";

function getPaksuseKvaliteet(mm: number): "hea" | "vagahea" | "suurepärane" {
  if (mm >= 180) return "suurepärane";
  if (mm >= 100) return "vagahea";
  return "hea";
}

const M2_PER_TÖÖPÄEV = 120; // ~120 m² päevas nagu Aldreht

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

function parseNum(val: string, min: number, max: number, fallback: number): number {
  const n = parseFloat(String(val).replace(",", "."));
  if (Number.isNaN(n)) return fallback;
  return Math.max(min, Math.min(max, n));
}

export function PurVahuHindCalculator() {
  const locale = useLocale();
  const t = getMessages(locale).purVahuHind.calculator;
  const searchParams = useSearchParams();
  const reducedMotion = useReducedMotion();
  const duration = reducedMotion ? 0 : 0.2;

  const [konstruktsioon, setKonstruktsioon] = useState<string>(() => searchParams.get("konstruktsioon") || "katusealune");
  const [vahuTyyp, setVahuTyyp] = useState<string>(() => searchParams.get("vahu_tyyp") || "suletud-pooridega");
  const [pindala, setPindala] = useState<string>(() => {
    const p = searchParams.get("pindala");
    if (p) return p;
    return String(PINDALA_DEFAULT);
  });
  const [paksusMm, setPaksusMm] = useState(() => {
    const p = searchParams.get("paksus");
    if (p) return parseNum(p, PAKSUS_MIN, PAKSUS_MAX, PAKSUS_DEFAULT);
    return PAKSUS_DEFAULT;
  });
  const [thermograafia, setThermograafia] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [submitError, setSubmitError] = useState("");

  const pindalaNum = useMemo(
    () => (pindala === "" ? PINDALA_DEFAULT : parseNum(pindala, PINDALA_MIN, PINDALA_MAX, PINDALA_DEFAULT)),
    [pindala]
  );
  const isVundamentSokkel = konstruktsioon === VUNDAMENT_VALUE;
  const sustitavDisabled = isVundamentSokkel;

  // Vundament → vahu peab olema pihustatav (mitte süstitav)
  useEffect(() => {
    if (isVundamentSokkel && vahuTyyp === "sustitav") {
      setVahuTyyp("suletud-pooridega");
    }
  }, [isVundamentSokkel, vahuTyyp]);

  const eurPerM3 = useMemo(() => {
    const o = PUR_VAHU_HINNAD.find((x) => x.value === vahuTyyp);
    return o ? o.eurPerM3 : 230;
  }, [vahuTyyp]);

  const mahtM3 = useMemo(() => (pindalaNum * paksusMm) / 1000, [pindalaNum, paksusMm]);
  const varuM3 = useMemo(() => mahtM3 * (VARU_PERCENT / 100), [mahtM3]);
  const mahtKoosVaruga = mahtM3 + varuM3;

  const materjalEur = useMemo(() => mahtM3 * eurPerM3, [mahtM3, eurPerM3]);
  const paigaldusHinnangEur = useMemo(() => Math.round(materjalEur * 0.35), [materjalEur]);
  const kokkuIlmaKm = useMemo(() => materjalEur + paigaldusHinnangEur, [materjalEur, paigaldusHinnangEur]);
  const kmEur = useMemo(() => Math.round(kokkuIlmaKm * 0.24), [kokkuIlmaKm]);
  const kokkuKoosKm = kokkuIlmaKm + kmEur;
  const eurPerM2 = pindalaNum > 0 ? kokkuKoosKm / pindalaNum : 0;

  const paksuseKvaliteetVariant = useMemo(() => getPaksuseKvaliteet(paksusMm), [paksusMm]);
  const paksuseKvaliteetLabel =
    paksuseKvaliteetVariant === "suurepärane" ? t.qualitySuurepärane : paksuseKvaliteetVariant === "vagahea" ? t.qualityVagahea : t.qualityHea;
  const tööpäevad = useMemo(() => Math.max(1, Math.ceil(pindalaNum / M2_PER_TÖÖPÄEV)), [pindalaNum]);

  const updateUrl = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([k, v]) => {
        if (v) params.set(k, v);
        else params.delete(k);
      });
      window.history.replaceState({}, "", `?${params.toString()}`);
    },
    [searchParams]
  );

  useEffect(() => {
    updateUrl({
      konstruktsioon,
      vahu_tyyp: vahuTyyp,
      pindala: pindalaNum > 0 ? String(pindalaNum) : "",
      paksus: String(paksusMm),
    });
  }, [konstruktsioon, vahuTyyp, pindalaNum, paksusMm, updateUrl]);

  const summaryText = useMemo(() => {
    const k = t.construction[konstruktsioon as keyof typeof t.construction]?.label ?? konstruktsioon;
    const v = t.foam[vahuTyyp as keyof typeof t.foam]?.label ?? vahuTyyp;
    const workdayStr = tööpäevad === 1 ? t.summaryWorkday : t.summaryWorkdays;
    return [
      `${t.summaryLineSurface} ${k}`,
      `${t.summaryLineFoam} ${v}`,
      `${t.summaryLineArea} ${pindalaNum} m², ${t.paksusLabel.toLowerCase()} ${paksusMm} mm`,
      `${t.summaryLineVolume} ${mahtM3.toFixed(2)} m³ (+ ${VARU_PERCENT}% ${t.summaryVaru} = ${mahtKoosVaruga.toFixed(2)} m³)`,
      `${t.summaryLineWorktime} ~${M2_PER_TÖÖPÄEV} ${t.summaryPerDay}, ${tööpäevad} ${workdayStr}`,
      `${t.summaryLinePrice} ${Math.round(kokkuKoosKm)} € (≈ ${eurPerM2.toFixed(1)} ${t.summaryPerM2})`,
    ].join("\n");
  }, [t, konstruktsioon, vahuTyyp, pindalaNum, paksusMm, mahtM3, mahtKoosVaruga, tööpäevad, kokkuKoosKm, eurPerM2]);

  return (
    <>
      <div className="md:grid md:grid-cols-2 md:gap-8 md:items-start">
      <div className="space-y-8">
        <div>
          <h3 id="konstruktsioon-label" className="text-sm font-semibold uppercase tracking-wider text-slate-500">{t.surfaceTypeLabel}</h3>
          <p className="mt-1 text-xs text-slate-500">{t.surfaceTypeHint}</p>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3" role="group" aria-labelledby="konstruktsioon-label">
            {KONSTRUKTSIOON_OPTIONS.map((opt) => {
              const Icon = opt.Icon;
              const c = t.construction[opt.value as keyof typeof t.construction];
              const label = c?.label ?? opt.value;
              const subtitle = c?.subtitle ?? "";
              return (
                <motion.button
                  key={opt.value}
                  type="button"
                  onClick={() => setKonstruktsioon(opt.value)}
                  initial={reducedMotion ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: duration + 0.05 }}
                  className={cn(
                    "flex flex-col items-start rounded-2xl border-2 px-5 py-4 text-left shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
                    konstruktsioon === opt.value
                      ? "border-primary-600 bg-primary-50 text-primary-900 shadow-md ring-2 ring-primary-200"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:shadow-md"
                  )}
                  aria-pressed={konstruktsioon === opt.value}
                  aria-label={`${label} – ${subtitle}`}
                >
                  <Icon className={konstruktsioon === opt.value ? "text-primary-600" : "text-slate-400"} aria-hidden />
                  <span className="mt-2 block font-semibold text-slate-900">{label}</span>
                  <span className="mt-0.5 block text-xs text-slate-500">{subtitle}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        <div>
          <h3 id="vahu-tyyp-label" className="text-sm font-semibold uppercase tracking-wider text-slate-500">{t.foamTypeLabel}</h3>
          <p className="mt-1 text-xs text-slate-500">{t.foamTypeHint}</p>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3" role="group" aria-labelledby="vahu-tyyp-label">
            {PUR_VAHU_HINNAD.map((opt) => {
              const VahuIcon = VAHU_ICONS[opt.value];
              const foamT = t.foam[opt.value as keyof typeof t.foam];
              const label = foamT?.label ?? opt.label;
              const subtitle = foamT?.subtitle ?? "";
              const disabled = opt.value === "sustitav" && sustitavDisabled;
              return (
                <motion.button
                  key={opt.value}
                  type="button"
                  disabled={disabled}
                  onClick={() => !disabled && setVahuTyyp(opt.value)}
                  initial={reducedMotion ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: duration + 0.05 }}
                  className={cn(
                    "flex flex-col items-start rounded-2xl border-2 px-5 py-4 text-left shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
                    vahuTyyp === opt.value
                      ? "border-primary-600 bg-primary-50 text-primary-900 shadow-md ring-2 ring-primary-200"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:shadow-md",
                    disabled && "cursor-not-allowed border-slate-100 bg-slate-50 text-slate-400 opacity-75"
                  )}
                  aria-pressed={vahuTyyp === opt.value}
                  aria-label={disabled ? `${label} – ${t.foamDisabledWhy}` : `${label}, ${subtitle}, ${opt.eurPerM3} €/m³`}
                  title={disabled ? t.foamDisabledWhy : undefined}
                >
                  {VahuIcon && <VahuIcon className={vahuTyyp === opt.value ? "text-primary-600" : "text-slate-400"} aria-hidden />}
                  <span className="mt-2 block font-semibold text-slate-900">{label}</span>
                  <span className="mt-0.5 block text-xs text-slate-500">{subtitle}</span>
                  <span className="mt-2 block text-sm font-medium text-slate-600">{opt.eurPerM3} €/m³ + km</span>
                </motion.button>
              );
            })}
          </div>
          {sustitavDisabled && (
            <p className="mt-3 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800 shadow-sm" role="status">
              <strong>{t.foamDisabledNoteTitle}</strong> {t.foamDisabledNoteBody}
            </p>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 shadow-sm">
          <label htmlFor="pur-pindala" className="block text-sm font-semibold text-slate-700">
            {t.pindalaLabel}
          </label>
          <div className="mt-3 flex flex-wrap items-center gap-4">
            <input
              id="pur-pindala"
              type="range"
              min={PINDALA_MIN}
              max={PINDALA_MAX}
              step={1}
              value={pindalaNum}
              onChange={(e) => setPindala(String(e.target.value))}
              className="h-3 w-full min-w-0 flex-1 accent-primary-600 sm:h-4"
              aria-valuemin={PINDALA_MIN}
              aria-valuemax={PINDALA_MAX}
              aria-valuenow={pindalaNum}
              aria-valuetext={`${pindalaNum} m²`}
            />
            <input
              type="number"
              min={PINDALA_MIN}
              max={PINDALA_MAX}
              step={1}
              inputMode="decimal"
              value={pindala}
              onChange={(e) => setPindala(e.target.value)}
              placeholder="120"
              className="w-28 rounded-xl border-2 border-slate-300 bg-white px-4 py-3 text-right text-lg font-semibold text-slate-900 focus:border-primary-500 focus:ring-primary-500"
              aria-label={t.pindalaLabel}
            />
          </div>
          <p className="mt-1 text-xs text-slate-500">{t.currentValue} {pindalaNum} m²</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 shadow-sm">
          <label htmlFor="pur-paksus" className="block text-sm font-semibold text-slate-700">
            {t.paksusLabel}
          </label>
          <div className="mt-3 flex flex-wrap items-center gap-4">
            <input
              id="pur-paksus"
              type="range"
              min={PAKSUS_MIN}
              max={PAKSUS_MAX}
              step={5}
              value={paksusMm}
              onChange={(e) => setPaksusMm(Number(e.target.value))}
              className="h-3 w-full min-w-0 flex-1 accent-primary-600 sm:h-4"
              aria-valuemin={PAKSUS_MIN}
              aria-valuemax={PAKSUS_MAX}
              aria-valuenow={paksusMm}
              aria-valuetext={`${paksusMm} mm`}
            />
            <input
              type="number"
              min={PAKSUS_MIN}
              max={PAKSUS_MAX}
              step={5}
              value={paksusMm}
              onChange={(e) => setPaksusMm(parseNum(e.target.value, PAKSUS_MIN, PAKSUS_MAX, PAKSUS_DEFAULT))}
              className="w-28 rounded-xl border-2 border-slate-300 bg-white px-4 py-3 text-right text-lg font-semibold text-slate-900 focus:border-primary-500 focus:ring-primary-500"
              aria-label={t.paksusLabel}
            />
          </div>
          <p className="mt-1 text-xs text-slate-500">{t.currentValue} {paksusMm} mm</p>
          <p className="mt-2 flex items-center gap-2 text-sm" role="status" aria-live="polite">
            <span className="text-slate-500">{t.qualityLabel}</span>
            <span
              className={cn(
                "inline-flex rounded-full px-3 py-1 text-xs font-semibold",
                paksuseKvaliteetVariant === "suurepärane" && "bg-emerald-100 text-emerald-800",
                paksuseKvaliteetVariant === "vagahea" && "bg-primary-100 text-primary-800",
                paksuseKvaliteetVariant === "hea" && "bg-slate-100 text-slate-700"
              )}
            >
              {paksuseKvaliteetLabel}
            </span>
          </p>
        </div>

      </div>

      {/* Kokkuvõtte plokk – sama laiusega, kõrgus vastab sisule (ei venita) */}
      <motion.div
        layout
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: duration + 0.1 }}
        className="rounded-2xl border-2 border-primary-200 bg-gradient-to-b from-white to-primary-50/30 p-6 shadow-xl md:sticky md:top-8 md:mt-0"
        aria-labelledby="kokkuvote-heading"
      >
        <h3 id="kokkuvote-heading" className="text-sm font-semibold uppercase tracking-wider text-slate-500">{t.summaryHeading}</h3>
        <div className="mt-4 space-y-2.5 text-sm">
          <div className="flex justify-between text-slate-600">
            <span>{t.summaryVahuKogus}</span>
            <span className="font-medium tabular-nums">
              <CountUp value={mahtM3} duration={reducedMotion ? 0 : 300} decimals={2} /> m³
            </span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>+ {VARU_PERCENT_MIN}–{VARU_PERCENT_MAX}% {t.summaryVaru}</span>
            <span className="font-medium tabular-nums">
              (<CountUp value={mahtKoosVaruga} duration={reducedMotion ? 0 : 300} decimals={2} /> m³)
            </span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>{t.summaryTööaeg}</span>
            <span className="font-medium tabular-nums">
              ~{M2_PER_TÖÖPÄEV} {t.summaryPerDay} · {tööpäevad} {tööpäevad === 1 ? t.summaryWorkday : t.summaryWorkdays}
            </span>
          </div>
          <div className="my-2 border-t border-slate-200 pt-2" aria-hidden />
          <div className="flex justify-between text-slate-600">
            <span>{t.summaryMaterjal}</span>
            <span className="font-semibold tabular-nums text-slate-900">
              <CountUp value={Math.round(materjalEur)} duration={reducedMotion ? 0 : 350} /> €
            </span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>{t.summaryPaigaldus}</span>
            <span className="font-semibold tabular-nums text-slate-900">
              <CountUp value={paigaldusHinnangEur} duration={reducedMotion ? 0 : 350} /> €
            </span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>{t.summaryKogukulu}</span>
            <span className="font-semibold tabular-nums text-slate-900">
              <CountUp value={Math.round(kokkuIlmaKm)} duration={reducedMotion ? 0 : 350} /> €
            </span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>{t.summaryKm}</span>
            <span className="font-semibold tabular-nums text-slate-900">
              <CountUp value={kmEur} duration={reducedMotion ? 0 : 350} /> €
            </span>
          </div>
          <p className="pt-1 text-xs text-slate-500">{t.summaryNote}</p>
          <div className="flex justify-between border-t-2 border-primary-200 pt-4 text-lg font-bold text-slate-900">
            <span>{t.summaryTotalLabel}</span>
            <span className="tabular-nums text-primary-700">
              <CountUp value={Math.round(kokkuKoosKm)} duration={reducedMotion ? 0 : 400} /> €
            </span>
          </div>
          <p className="text-sm font-medium text-slate-600">≈ <CountUp value={eurPerM2} duration={reducedMotion ? 0 : 350} decimals={1} /> {t.summaryPerM2}</p>
        </div>
        <Button
          type="button"
          variant="primary"
          size="lg"
          className="mt-6 w-full min-h-[52px] text-base shadow-md"
          onClick={() => { setSubmitStatus("idle"); setSubmitError(""); setModalOpen(true); }}
          aria-label={t.sendInquiryAria}
        >
          {t.sendInquiry}
        </Button>
      </motion.div>
      </div>

      {/* Modal – inquiry form */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4"
            onClick={() => !(submitStatus === "submitting") && setModalOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <motion.div
              initial={reducedMotion ? false : { y: "100%" }}
              animate={{ y: 0 }}
              exit={reducedMotion ? {} : { y: "100%" }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="w-full max-h-[90vh] overflow-y-auto rounded-t-2xl bg-white shadow-xl sm:max-w-lg sm:rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
                <h2 id="modal-title" className="text-lg font-bold text-slate-900">{t.modalTitle}</h2>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                  aria-label={t.modalClose}
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="p-6">
                {submitStatus === "success" ? (
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center text-emerald-800">
                    <h3 className="text-xl font-bold">{t.successTitle}</h3>
                    <p className="mt-2">{t.successMessage}</p>
                    <Button type="button" className="mt-6" onClick={() => setModalOpen(false)}>{t.closeButton}</Button>
                  </div>
                ) : (
                  <PurVahuHindForm
                    summaryText={summaryText}
                    thermograafia={thermograafia}
                    setThermograafia={setThermograafia}
                    calculatorParams={{ pindalaNum, paksusMm, konstruktsioon, vahuTyyp, mahtM3 }}
                    onSuccess={() => setSubmitStatus("success")}
                    onError={(msg) => { setSubmitStatus("error"); setSubmitError(msg); }}
                    onSubmitting={() => setSubmitStatus("submitting")}
                    submitStatus={submitStatus}
                    submitError={submitError}
                    locale={locale}
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function PurVahuHindForm({
  summaryText,
  thermograafia,
  setThermograafia,
  calculatorParams,
  onSuccess,
  onError,
  onSubmitting,
  submitStatus,
  submitError,
  locale,
}: {
  summaryText: string;
  thermograafia: boolean;
  setThermograafia: (v: boolean) => void;
  calculatorParams: { pindalaNum: number; paksusMm: number; konstruktsioon: string; vahuTyyp: string; mahtM3: number };
  onSuccess: () => void;
  onError: (msg: string) => void;
  onSubmitting: () => void;
  submitStatus: string;
  submitError: string;
  locale: "et" | "fi";
}) {
  const formT = getMessages(locale).form;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [aadress, setAadress] = useState("");
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [turnstileToken, setTurnstileToken] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitting();
    try {
      const formSubmitUrl = `https://formsubmit.co/ajax/${encodeURIComponent(company.email)}`;
      const submitBody = new FormData();
      submitBody.append("name", name);
      submitBody.append("email", email);
      submitBody.append("phone", phone ?? "");
      submitBody.append("message", [message, "", "--- Kalkulaatori kokkuvõte ---", summaryText].filter(Boolean).join("\n\n"));
      submitBody.append("_subject", "Pinnakatted.ee – päring (PUR kalkulaator)");
      submitBody.append("_replyto", email);
      submitBody.append("_template", "table");
      submitBody.append("_captcha", "false");
      submitBody.append("Tüüp", "pur");
      submitBody.append("Pindala (m²)", String(calculatorParams.pindalaNum));
      submitBody.append("Paksus (mm)", String(calculatorParams.paksusMm));
      submitBody.append("Konstruktsioon", calculatorParams.konstruktsioon);
      submitBody.append("Maht (m³)", calculatorParams.mahtM3.toFixed(2));
      if (aadress) submitBody.append("Aadress / vald", aadress);
      submitBody.append("Termograafia soov", thermograafia ? "Jah" : "Ei");
      files.forEach((f) => submitBody.append("attachment", f));
      const res = await fetch(formSubmitUrl, { method: "POST", body: submitBody });
      const data = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string };
      if (!res.ok || data.success === false) {
        onError(data.message ?? formT.errorGeneric);
        return;
      }
      onSuccess();
    } catch {
      onError(formT.errorNetwork);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="pv-name" className="block text-sm font-medium text-slate-700">{formT.name} *</label>
        <input id="pv-name" type="text" required value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-primary-500 focus:ring-primary-500" autoComplete="name" />
      </div>
      <div>
        <label htmlFor="pv-email" className="block text-sm font-medium text-slate-700">{formT.email} *</label>
        <input id="pv-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-primary-500 focus:ring-primary-500" autoComplete="email" />
      </div>
      <div>
        <label htmlFor="pv-phone" className="block text-sm font-medium text-slate-700">{formT.phone}</label>
        <input id="pv-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-primary-500 focus:ring-primary-500" autoComplete="tel" />
      </div>
      <div>
        <label htmlFor="pv-aadress" className="block text-sm font-medium text-slate-700">{formT.addressOrRegion}</label>
        <input id="pv-aadress" type="text" value={aadress} onChange={(e) => setAadress(e.target.value)} placeholder={formT.placeholderAddress} className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-primary-500 focus:ring-primary-500" />
      </div>
      <div>
        <label htmlFor="pv-message" className="block text-sm font-medium text-slate-700">{formT.extraInfo}</label>
        <textarea id="pv-message" rows={3} value={message} onChange={(e) => setMessage(e.target.value)} placeholder={formT.placeholderExtraInfo} className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-primary-500 focus:ring-primary-500" />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">{formT.images}</label>
        <input type="file" accept="image/*" multiple onChange={(e) => setFiles(Array.from(e.target.files ?? []))} className="mt-1 block w-full text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-primary-50 file:px-4 file:py-2 file:text-primary-700" />
      </div>
      <div className="flex items-start gap-3">
        <input
          id="pv-thermograafia"
          type="checkbox"
          checked={thermograafia}
          onChange={(e) => setThermograafia(e.target.checked)}
          className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
        />
        <label htmlFor="pv-thermograafia" className="text-sm text-slate-700">
          {formT.thermografiaCheck}
        </label>
      </div>
      <div className="flex justify-center">
        <Turnstile
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "1x00000000000000000000AA"}
          onSuccess={(token) => setTurnstileToken(token)}
          onExpire={() => setTurnstileToken("")}
          options={{ theme: "light", size: "normal" }}
        />
      </div>
      {submitError && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{submitError}</p>}
      <Button type="submit" variant="primary" size="lg" className="w-full min-h-[48px]" disabled={submitStatus === "submitting" || !turnstileToken}>
        {submitStatus === "submitting" ? formT.sending : formT.send}
      </Button>
    </form>
  );
}
