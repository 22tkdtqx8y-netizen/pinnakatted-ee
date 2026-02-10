"use client";

import { useState, useMemo } from "react";
import { estoTingimused } from "@/content/estoTingimused";

function monthlyPayment(principal: number, annualRate: number, months: number, fee: number): number {
  if (months <= 0) return 0;
  const totalPrincipal = principal + fee;
  const monthlyRate = annualRate / 100 / 12;
  if (monthlyRate === 0) return totalPrincipal / months;
  return (totalPrincipal * (monthlyRate * Math.pow(1 + monthlyRate, months))) / (Math.pow(1 + monthlyRate, months) - 1);
}

export function JarelmaksuKalkulaator() {
  const [summa, setSumma] = useState(3000);
  const [kuud, setKuud] = useState(24);

  const kuumakse = useMemo(
    () =>
      Math.round(
        monthlyPayment(
          summa,
          estoTingimused.aastaneIntress,
          kuud,
          estoTingimused.lepingutasu
        ) * 100
      ) / 100,
    [summa, kuud]
  );

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
      <p className="border-b border-slate-200 bg-slate-50 px-6 py-3 text-center text-sm text-slate-600">
        Tulemus on ligikaudne; täpne maksegraafik tuleb ESTO lepingul.
      </p>

      {/* Tumed plokk: slider + periood */}
      <div className="bg-slate-800 px-6 py-6 sm:px-8 sm:py-8">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-slate-300">Summa</p>
          <p className="mt-1 text-2xl font-bold text-white">{summa} €</p>
          <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
            <span>{estoTingimused.minSumma} €</span>
            <input
              type="range"
              min={estoTingimused.minSumma}
              max={estoTingimused.maxSumma}
              step={50}
              value={summa}
              onChange={(e) => setSumma(Number(e.target.value))}
              className="h-2 flex-1 appearance-none rounded-full bg-slate-600 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-brand"
              aria-label="Laenusumma eurodes"
            />
            <span>{estoTingimused.maxSumma} €</span>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-sm font-medium uppercase tracking-wide text-slate-300">Periood</p>
          <p className="mt-1 text-lg font-bold text-white">{kuud} kuud</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {estoTingimused.perioodidKuudes.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setKuud(n)}
                className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
                  kuud === n
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-700 text-slate-200 hover:bg-slate-600"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tulemus: kuumakse */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 bg-slate-50 px-6 py-5 sm:px-8">
        <span className="text-sm font-medium uppercase tracking-wide text-slate-500">esto</span>
        <p className="text-right">
          <span className="block text-sm font-medium uppercase tracking-wide text-slate-500">Kuumakse</span>
          <span className="text-2xl font-bold text-slate-900 sm:text-3xl">{kuumakse.toFixed(2)} €</span>
        </p>
      </div>
    </div>
  );
}
