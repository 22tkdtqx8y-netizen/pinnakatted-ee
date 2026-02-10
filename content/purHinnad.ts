/**
 * PUR vahu m³ hinnad (kliendi andmed). Hind on €/m³ + km (lisanduväärtuskäibemaks).
 */
export const PUR_VAHU_HINNAD = [
  { value: "suletud-pooridega", label: "Suletud pooridega vahu (pihustamine)", eurPerM3: 230 },
  { value: "sustitav", label: "Süstitav / injekteeritav vahu (injekteerimine)", eurPerM3: 160 },
  { value: "avatud-pooriga", label: "Avatud pooriga vahu (pihustamine)", eurPerM3: 90 },
] as const;
