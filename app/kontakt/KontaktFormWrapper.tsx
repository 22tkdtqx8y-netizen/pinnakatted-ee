"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { LeadForm } from "@/components/LeadForm";
import type { LeadFormPrefill } from "@/components/LeadForm";

interface KontaktFormWrapperProps {
  /** Pre-fill thermograafia checkbox (e.g. from /thermograafia page or ?thermograafia=1) */
  initialThermograafia?: boolean;
}

export function KontaktFormWrapper({ initialThermograafia }: KontaktFormWrapperProps = {}) {
  const searchParams = useSearchParams();
  const prefill = useMemo<LeadFormPrefill>(() => {
    const p: LeadFormPrefill = {};
    const type = searchParams.get("type");
    if (type) p.type = type;
    const pindala = searchParams.get("pindala_m2");
    if (pindala) p.pindala_m2 = pindala;
    const paksus = searchParams.get("paksus_mm");
    if (paksus) p.paksus_mm = paksus;
    const konstruktsioon = searchParams.get("konstruktsioon");
    if (konstruktsioon) p.konstruktsioon = konstruktsioon;
    const maht = searchParams.get("maht_m3");
    if (maht) p.maht_m3 = maht;
    const pinnaTyyp = searchParams.get("pinna_tyyp");
    if (pinnaTyyp) p.pinna_tyyp = pinnaTyyp;
    const ettevalmistus = searchParams.get("ettevalmistus");
    if (ettevalmistus) p.ettevalmistus = ettevalmistus;
    if (initialThermograafia || searchParams.get("thermograafia") === "1") p.thermograafia = true;
    return p;
  }, [searchParams, initialThermograafia]);

  return <LeadForm prefill={prefill} className="mt-6" maxImages={6} />;
}
