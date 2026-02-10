export const services = {
  pur: {
    slug: "pur-soojustus",
    title: "PUR soojustus",
    shortTitle: "PUR",
    description:
      "PUR (polüuretaanvaik) on soojustusmaterjal, mis aitab vähendada soojuskadu. Rakendatakse pihustamise või injekteerimise teel vastavalt objekti tehnilistele tingimustele – pööningud, seinad, vundamendid.",
    problem:
      "Soojuskadu läbi katuse, seina või vundamendi suurendab küttekulusid ja halvendab elamistingimusi.",
    solution:
      "PUR-soojustus moodustab vuugivaba soojustuskihi, täidab praod ja sobib keerukatesse konstruktsioonidesse. Lahendus valitakse vastavalt aluspinnale ja kasutusotstarbele.",
    where: ["Pööning / katus", "Seinad", "Vundament / sokkel"],
    benefits: [
      "Aitab vähendada soojuskadusid ja parandada energiatõhusust",
      "Parandab sisekliimat ja minimeerib külmasildu",
      "Moodustab vuugivaba, pideva soojustuskihi",
      "Pikaajaline soojustus, kui järgitud on paigaldusjuhiseid",
    ],
    process: [
      "Konsultatsioon ja objekti info kogumine",
      "Vajaduste ja tingimuste hindamine, sobiva lahenduse ettepanek",
      "Tööde mahu ja ajakava kokkuleppimine",
      "Tööde teostamine kokkulepitud tingimustel",
      "Lõppülevaatus ja tagasiside",
    ],
    ctaTitle: "Soovid PUR-soojustust?",
    ctaDescription: "Küsi tasuta pakkumist või arvuta orientiirhind kalkulaatoriga.",
  },
  polurea: {
    slug: "polurea",
    title: "Polükarbamiid hüdroisolatsioon",
    shortTitle: "Polükarbamiid",
    subtitle: "(polüurea kate)",
    description:
      "Polükarbamiid (polüurea kate) on tugev, elastne ja veekindel kate. Sobib katustele, mahutitele, basseinidele ja põrandatele.",
    problem:
      "Läbiv niiskus, lekkiv katus või kahjustatud pind vajab usaldusväärset ja pikaajalist kaitse.",
    solution:
      "Polüurea moodustab õhukese, tõrjuva kihi, mis kaitseb pinnast niiskuse, kemikaalide ja kulumise eest.",
    where: ["Katus", "Mahuti", "Bassein", "Põrand", "Muu"],
    benefits: [
      "Vee- ja kemikaalikindel",
      "Kiire kuivamine ja kasutuskõlblik",
      "Elastne, pragudega töötav",
      "Pika kasutusiga",
    ],
    process: [
      "Pinna puhastamine ja parandamine",
      "Põhikihi (vajadusel) ja polüurea rakendamine",
      "Kontroll ja soovitused hoolduseks",
    ],
    ctaTitle: "Vajad polükarbamiid hüdroisolatsiooni?",
    ctaDescription: "Saada päring koos pindala ja pinna tüübiga – vastame kiiresti.",
  },
} as const;

export type ServiceKey = keyof typeof services;
