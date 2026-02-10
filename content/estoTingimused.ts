/**
 * ESTO järelmaksu tingimused kalkulaatori jaoks.
 * Uuenda neid, kui ESTO muudab oma tingimusi (intress, lepingutasu, perioodid).
 * Allikas: ESTO AS (reg. kood 14180709), esto.ee
 */
export const estoTingimused = {
  /** Aastane intress (%). ESTO pakub alates 0. */
  aastaneIntress: 13.9,
  /** Lepingutasu (€). ESTO pakub alates 0. */
  lepingutasu: 13.9,
  /** Võimalikud perioodid kuudes. ESTO kuni 4 aastat (48 kuud); siin laiendatud valik kalkulaatoris. */
  perioodidKuudes: [3, 6, 12, 18, 24, 36, 48, 60] as const,
  /** Minimaalne laenusumma (€). */
  minSumma: 100,
  /** Maksimaalne laenusumma (€) kalkulaatori jaoks. */
  maxSumma: 10000,
} as const;
