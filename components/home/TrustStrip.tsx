"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/lib/LocaleContext";
import { getMessages } from "@/messages";

export function TrustStrip() {
  const locale = useLocale();
  const items = getMessages(locale).home.trustStrip;

  return (
    <section className="border-b border-slate-200 bg-white py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              className="text-center"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <p className="text-2xl font-bold text-primary-600 sm:text-3xl">{item.value}</p>
              <p className="mt-1 text-sm font-medium text-slate-600">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
