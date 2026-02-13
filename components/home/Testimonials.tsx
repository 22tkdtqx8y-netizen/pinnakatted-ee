"use client";

import { motion } from "framer-motion";
import { testimonials } from "@/content/testimonials";
import { testimonialsFi } from "@/content/testimonialsFi";
import { useLocale } from "@/lib/LocaleContext";
import { getMessages } from "@/messages";

export function Testimonials() {
  const locale = useLocale();
  const t = getMessages(locale).home.testimonials;
  const list = locale === "fi" ? testimonialsFi : testimonials;

  return (
    <section className="bg-slate-100 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {t.title}
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            {t.intro}
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.slice(0, 6).map((item, i) => (
            <motion.blockquote
              key={i}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <p className="text-slate-700">&ldquo;{item.quote}&rdquo;</p>
              <footer className="mt-4 font-semibold text-slate-900">— {item.author}</footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
