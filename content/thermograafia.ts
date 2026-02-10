/**
 * Termograafia (thermography) = termopildistamine. Tasuline teenus, mitte diagnostika.
 * Konkurendid (termograaf.ee, soojusaudit.ee) kasutavad "termograafeerimine" / "termopildistamine".
 */

export const thermograafia = {
  hero: {
    title: "Termograafia ehk termopildistamine",
    subtitle:
      "Termopildistamine spetsiaalse (infrapuna)kaameraga – soojuskaod, õhulekked ja probleemkohad nähtavaks. Eraldi tasuline teenus, tellitav eraldi või pärast soojustustöid.",
  },
  what: {
    title: "Mis on teenus?",
    points: [
      "Termograafia ehk termopildistamine – pildistamine infrapunakaameraga",
      "Visuaalne ülevaade soojuskaodest ja õhuleketest",
      "Sobib hoonete hindamiseks ja tööde järelkontrolliks (ei ole meditsiiniline ega tehniline diagnostika)",
    ],
  },
  whenOrdered: {
    title: "Millal termograafiat tellitakse?",
    items: [
      "Kui soovitakse hinnata hoone soojapidavust",
      "Kui kahtlustatakse soojalekkeid või külmasildu",
      "Pärast soojustustöid, kui soovitakse töö tulemust visuaalselt kontrollida",
    ],
  },
  pricing: {
    title: "Hind",
    fromPrice: "Alates 250 € / objekt",
    note1: "Lõplik hind sõltub hoone suurusest ja keerukusest",
    note2: "Hind lepitakse kokku enne töö teostamist",
  },
  whatClientGets: {
    title: "Mida klient saab?",
    items: [
      "Termograafiapildid",
      "Pildid vaadatakse kliendiga soovi korral koos üle",
      "Lühike selgitus nähtud probleemide kohta",
    ],
  },
  importantNote:
    "Termograafia on eraldi tasuline teenus ega ole automaatselt osa soojustustöödest.",
  cta: {
    primary: "Päring termograafia tellimiseks",
    microcopy: "Võtame ühendust ja täpsustame objekti ning hinna.",
  },
} as const;
