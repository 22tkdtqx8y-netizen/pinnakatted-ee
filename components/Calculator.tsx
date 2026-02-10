"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { PUR_VAHU_HINNAD } from "@/content/purHinnad";

type TabId = "pur" | "polurea";

const THICKNESS_PRESETS = [100, 150, 200, 250] as const;
const KONSTRUKTSIOON_OPTIONS = [
  { value: "pooning-katus", label: "Pööning / katus" },
  { value: "sein", label: "Sein" },
  { value: "vundament-sokkel", label: "Vundament / sokkel" },
] as const;

const PINNA_TYYP_OPTIONS = [
  { value: "katus", label: "Katus" },
  { value: "mahuti", label: "Mahuti" },
  { value: "bassein", label: "Bassein" },
  { value: "põrand", label: "Põrand" },
  { value: "muu", label: "Muu" },
] as const;

const ETTEVALMISTUS_OPTIONS = [
  { value: "lihtne", label: "Lihtne" },
  { value: "keskmine", label: "Keskmine" },
  { value: "keeruline", label: "Keeruline" },
] as const;

const KAUGUS_OPTIONS = [
  { value: "30", label: "Kuni 30 km", eur: 0 },
  { value: "60", label: "30–60 km", eur: 50 },
  { value: "100", label: "60–100 km", eur: 75 },
  { value: "100+", label: "Üle 100 km", eur: 100 },
] as const;

function CountUp({
  value,
  duration = 600,
  decimals = 2,
}: {
  value: number;
  duration?: number;
  decimals?: number;
}) {
  const [display, setDisplay] = useState(0);
  const prevRef = useRef(value);

  useEffect(() => {
    const start = prevRef.current;
    prevRef.current = value;
    const startTime = performance.now();
    let raf: number;
    const step = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = 1 - (1 - t) * (1 - t);
      const current = start + (value - start) * eased;
      setDisplay(Number(current.toFixed(decimals)));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value, duration, decimals]);

  return <span>{display}</span>;
}

export function Calculator({ purOnly = false }: { purOnly?: boolean }) {
  const [activeTab, setActiveTab] = useState<TabId>("pur");

  // PUR inputs
  const [pindalaM2, setPindalaM2] = useState<string>("");
  const [paksusMm, setPaksusMm] = useState(150);
  const [konstruktsioon, setKonstruktsioon] = useState<string>("pooning-katus");
  const [vahuTyyp, setVahuTyyp] = useState<string>("suletud-pooridega");
  const [kaugus, setKaugus] = useState<string>("30");

  // Polürea inputs
  const [polureaPindala, setPolureaPindala] = useState<string>("");
  const [pinnaTyyp, setPinnaTyyp] = useState<string>("katus");
  const [ettevalmistus, setEttevalmistus] = useState<string>("keskmine");

  // Thermography add-on (pre-fills contact form)
  const [wantThermograafia, setWantThermograafia] = useState(false);

  const pindalaNum = useMemo(() => (pindalaM2 === "" ? 0 : Math.max(0, parseFloat(pindalaM2.replace(",", ".")) || 0)), [pindalaM2]);
  const polureaPindalaNum = useMemo(
    () => (polureaPindala === "" ? 0 : Math.max(0, parseFloat(polureaPindala.replace(",", ".")) || 0)),
    [polureaPindala]
  );

  const mahtM3 = useMemo(() => (pindalaNum * paksusMm) / 1000, [pindalaNum, paksusMm]);

  const purHind = useMemo(() => {
    const opt = PUR_VAHU_HINNAD.find((o) => o.value === vahuTyyp);
    return opt ? opt.eurPerM3 : 230;
  }, [vahuTyyp]);
  const transportEur = useMemo(() => {
    const opt = KAUGUS_OPTIONS.find((o) => o.value === kaugus);
    return opt ? opt.eur : 0;
  }, [kaugus]);
  const indikatiivneHindPur = useMemo(() => mahtM3 * purHind, [mahtM3, purHind]);
  const kokkuPur = useMemo(() => indikatiivneHindPur + transportEur, [indikatiivneHindPur, transportEur]);

  const inquiryParamsPur = useMemo(() => {
    const p = new URLSearchParams();
    p.set("type", "pur");
    p.set("pindala_m2", String(pindalaNum));
    p.set("paksus_mm", String(paksusMm));
    p.set("konstruktsioon", konstruktsioon);
    p.set("vahu_tyyp", vahuTyyp);
    p.set("maht_m3", mahtM3.toFixed(2));
    p.set("kaugus", kaugus);
    if (wantThermograafia) p.set("thermograafia", "1");
    return p.toString();
  }, [pindalaNum, paksusMm, konstruktsioon, vahuTyyp, mahtM3, kaugus, wantThermograafia]);

  const inquiryParamsPolurea = useMemo(() => {
    const p = new URLSearchParams();
    p.set("type", "polurea");
    p.set("pindala_m2", String(polureaPindalaNum));
    p.set("pinna_tyyp", pinnaTyyp);
    p.set("ettevalmistus", ettevalmistus);
    if (wantThermograafia) p.set("thermograafia", "1");
    return p.toString();
  }, [polureaPindalaNum, pinnaTyyp, ettevalmistus, wantThermograafia]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8">
      {!purOnly && (
        <div className="flex gap-2 border-b border-slate-200">
          <button
            type="button"
            onClick={() => setActiveTab("pur")}
            className={cn(
              "rounded-t-lg px-4 py-3 text-sm font-semibold transition-colors",
              activeTab === "pur"
                ? "border border-b-0 border-slate-200 border-b-white bg-white text-primary-600 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            )}
          >
            PUR
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("polurea")}
            className={cn(
              "rounded-t-lg px-4 py-3 text-sm font-semibold transition-colors",
              activeTab === "polurea"
                ? "border border-b-0 border-slate-200 border-b-white bg-white text-primary-600 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            )}
          >
            Polükarbamiid
          </button>
        </div>
      )}

      <AnimatePresence mode="wait">
        {(activeTab === "pur" || purOnly) && (
          <motion.div
            key="pur"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.2 }}
            className="pt-6"
          >
            <div className="space-y-6">
              <div>
                <label htmlFor="pur-pindala" className="block text-sm font-medium text-slate-700">
                  Pindala (m²)
                </label>
                <input
                  id="pur-pindala"
                  type="number"
                  min={0}
                  step={0.1}
                  inputMode="decimal"
                  value={pindalaM2}
                  onChange={(e) => setPindalaM2(e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 shadow-sm placeholder:text-slate-500 focus:border-primary-500 focus:ring-primary-500"
                  placeholder="nt 120"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Paksus (mm)</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {THICKNESS_PRESETS.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setPaksusMm(preset)}
                      className={cn(
                        "min-h-[44px] rounded-lg border-2 px-4 py-2 text-sm font-medium transition-colors",
                        paksusMm === preset
                          ? "border-primary-600 bg-primary-50 text-primary-700"
                          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                      )}
                    >
                      {preset} mm
                    </button>
                  ))}
                </div>
                <input
                  type="range"
                  min={80}
                  max={300}
                  step={10}
                  value={paksusMm}
                  onChange={(e) => setPaksusMm(Number(e.target.value))}
                  className="mt-3 w-full accent-primary-600"
                  aria-label="Paksus millimeetrites"
                />
                <p className="mt-1 text-sm text-slate-500">Valitud: {paksusMm} mm</p>
              </div>
              <div>
                <label htmlFor="pur-konstruktsioon" className="block text-sm font-medium text-slate-700">
                  Konstruktsioon
                </label>
                <select
                  id="pur-konstruktsioon"
                  value={konstruktsioon}
                  onChange={(e) => setKonstruktsioon(e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 focus:border-primary-500 focus:ring-primary-500"
                >
                  {KONSTRUKTSIOON_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
              {purOnly && (
                <div>
                  <label htmlFor="pur-kaugus" className="block text-sm font-medium text-slate-700">
                    Objekti kaugus
                  </label>
                  <select
                    id="pur-kaugus"
                    value={kaugus}
                    onChange={(e) => setKaugus(e.target.value)}
                    className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 focus:border-primary-500 focus:ring-primary-500"
                  >
                    {KAUGUS_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                        {o.eur > 0 ? ` (+${o.eur} €)` : ""}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div>
                <label htmlFor="pur-vahu-tyyp" className="block text-sm font-medium text-slate-700">
                  Vahu tüüp
                </label>
                <p className="mt-1 text-xs text-slate-500">
                  Pihustatav vahu – pööning, katus, lahtised seinad. Süstitav / injekteeritav vahu – seina- ja vahelae õõnsused, paneel- ja karkasskonstruktsioonid; ei kasutata vundamentidel.
                </p>
                {vahuTyyp === "sustitav" && (
                  <p className="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-xs text-slate-700">
                    Sobib seina- ja vahelae õõnsuste soojustamiseks. Ei kasutata vundamentidel.
                  </p>
                )}
                {vahuTyyp === "sustitav" && konstruktsioon === "vundament-sokkel" && (
                  <p className="mt-2 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-xs font-medium text-amber-800">
                    Süstimist ei kasutata vundamentidel. Vali pihustatav vahu või võta ühendust – leiame konstruktsioonile sobiva lahenduse.
                  </p>
                )}
                <select
                  id="pur-vahu-tyyp"
                  value={vahuTyyp}
                  onChange={(e) => setVahuTyyp(e.target.value)}
                  className="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 focus:border-primary-500 focus:ring-primary-500"
                >
                  {PUR_VAHU_HINNAD.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label} ({o.eurPerM3} €/m³ + km)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-8 rounded-xl bg-slate-50 p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                Tulemused
              </h3>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-slate-600">Maht (m³)</p>
                  <p className="text-2xl font-bold text-slate-900">
                    <CountUp value={mahtM3} decimals={2} />
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">
                    {purOnly && transportEur > 0 ? "Hinnanguline kogukulu" : "Indikatiivne hind"}
                  </p>
                  <p className="text-lg font-semibold text-slate-900">
                    {mahtM3 > 0 ? (
                      <>
                        <CountUp value={purOnly ? kokkuPur : indikatiivneHindPur} decimals={0} /> €
                        {!purOnly && " + km"}
                      </>
                    ) : (
                      <span className="text-slate-600">Sisesta pindala ja paksus</span>
                    )}
                  </p>
                  {purOnly && transportEur > 0 && (
                    <p className="mt-0.5 text-xs text-slate-500">
                      Materjal/paigaldus <CountUp value={indikatiivneHindPur} decimals={0} /> € + transport {transportEur} €
                    </p>
                  )}
                  {(!purOnly || transportEur === 0) && (
                    <p className="mt-0.5 text-xs text-slate-500">
                      {PUR_VAHU_HINNAD.find((o) => o.value === vahuTyyp)?.eurPerM3} €/m³ + km
                    </p>
                  )}
                </div>
              </div>
              {purOnly && pindalaNum > 0 && (
                <p className="mt-3 text-sm text-slate-600">
                  ≈ {(kokkuPur / pindalaNum).toFixed(1)} €/m² (indikatiivne)
                </p>
              )}
            </div>

            <div className="flex items-start gap-3">
              <input
                id="calc-thermograafia"
                type="checkbox"
                checked={wantThermograafia}
                onChange={(e) => setWantThermograafia(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
              />
              <label htmlFor="calc-thermograafia" className="text-sm text-slate-600">
                Soovin termograafiat (tasuline lisateenus, alates 250 € – lisatakse päringule)
              </label>
            </div>
            <div className="mt-6">
              <Button asChild variant="primary" size="lg" className="w-full min-h-[48px] sm:w-auto">
                <a href={`/kontakt?${inquiryParamsPur}`}>Saada päring nende mõõtudega</a>
              </Button>
            </div>
          </motion.div>
        )}

        {activeTab === "polurea" && (
          <motion.div
            key="polurea"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.2 }}
            className="pt-6"
          >
            <div className="space-y-6">
              <div>
                <label htmlFor="polurea-pindala" className="block text-sm font-medium text-slate-700">
                  Pindala (m²)
                </label>
                <input
                  id="polurea-pindala"
                  type="number"
                  min={0}
                  step={0.1}
                  inputMode="decimal"
                  value={polureaPindala}
                  onChange={(e) => setPolureaPindala(e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 shadow-sm placeholder:text-slate-500 focus:border-primary-500 focus:ring-primary-500"
                  placeholder="nt 80"
                />
              </div>
              <div>
                <label htmlFor="polurea-pinna-tyyp" className="block text-sm font-medium text-slate-700">
                  Pinna tüüp
                </label>
                <select
                  id="polurea-pinna-tyyp"
                  value={pinnaTyyp}
                  onChange={(e) => setPinnaTyyp(e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 focus:border-primary-500 focus:ring-primary-500"
                >
                  {PINNA_TYYP_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="polurea-ettevalmistus" className="block text-sm font-medium text-slate-700">
                  Ettevalmistuse tase
                </label>
                <select
                  id="polurea-ettevalmistus"
                  value={ettevalmistus}
                  onChange={(e) => setEttevalmistus(e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 focus:border-primary-500 focus:ring-primary-500"
                >
                  {ETTEVALMISTUS_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-8 rounded-xl bg-slate-50 p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                Töömahu hinnang
              </h3>
              <p className="mt-2 text-slate-700">
                Pindala {polureaPindalaNum > 0 ? polureaPindalaNum + " m²" : "—"}, pinna tüüp:{" "}
                {PINNA_TYYP_OPTIONS.find((o) => o.value === pinnaTyyp)?.label ?? pinnaTyyp}. Täpse
                hinna saamiseks saada päring, võimalusel koos piltidega.
              </p>
            </div>

            <div className="mt-4 flex items-start gap-3">
              <input
                id="calc-thermograafia-pol"
                type="checkbox"
                checked={wantThermograafia}
                onChange={(e) => setWantThermograafia(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
              />
              <label htmlFor="calc-thermograafia-pol" className="text-sm text-slate-600">
                Soovin termograafiat (tasuline lisateenus)
              </label>
            </div>
            <div className="mt-6">
              <Button asChild variant="primary" size="lg" className="w-full min-h-[48px] sm:w-auto">
                <a href={`/kontakt?${inquiryParamsPolurea}`}>Saada päring</a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
