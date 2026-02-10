"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

const BENEFITS = [
  { text: "Vähendab soojuskadu – soojem kodu, madalamad küttekulud" },
  { text: "Õhukindlus – täidab praod, vähem tuult ja niiskust" },
  { text: "Kiire paigaldus – tulemused juba 1–2 päevaga" },
];

const TRUST_LINE = "10+ aastat kogemust · Töögarantii · Teenindame kogu Eestit";

export function HeroHome() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-20 sm:py-28 lg:py-36">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20" aria-hidden />
      <div className="relative mx-auto max-w-4xl text-center">
        <motion.h1
          className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          PUR soojustus üle Eesti
        </motion.h1>
        <motion.p
          className="mx-auto mt-4 max-w-2xl text-lg text-slate-300 sm:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          Pihustame ja injekteerime PUR-vahu – soojapidav, õhutihe ja kiire lahendus.
        </motion.p>
        <ul className="mx-auto mt-6 max-w-xl space-y-2 text-left sm:text-center">
          {BENEFITS.map((b, i) => (
            <motion.li
              key={b.text}
              className="flex items-center gap-2 text-slate-200 sm:justify-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-500/80 text-white">
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </span>
              <span>{b.text}</span>
            </motion.li>
          ))}
        </ul>
        <motion.p
          className="mt-4 text-sm font-medium text-primary-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.25 }}
        >
          {TRUST_LINE}
        </motion.p>
        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button asChild variant="primary" size="lg" className="min-h-[48px] min-w-[180px]">
            <Link href="/kontakt">Küsi pakkumist</Link>
          </Button>
          <Button
            asChild
            size="lg"
            className="min-h-[48px] min-w-[180px] border-2 border-white bg-transparent text-white hover:bg-white/10"
          >
            <Link href="/pur-vahu-hind">Pur vahu hind</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
