"use client";

import { motion } from "framer-motion";

const trustItems = [
  { label: "Aastate kogemus", value: "10+" },
  { label: "Garantii", value: "Kvaliteet" },
  { label: "Teeninduspiirkond", value: "Kogu Eesti" },
  { label: "Hinnangud", value: "5 ★" },
];

export function TrustStrip() {
  return (
    <section className="border-b border-slate-200 bg-white py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {trustItems.map((item, i) => (
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
