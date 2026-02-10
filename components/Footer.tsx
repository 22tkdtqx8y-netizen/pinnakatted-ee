import Link from "next/link";
import { company } from "@/lib/company";

const footerLinks = {
  teenused: [
    { href: "/teenused/pur-soojustus", label: "PUR soojustus" },
    { href: "/thermograafia", label: "Thermograafia" },
    { href: "/teenused/polurea", label: "Polükarbamiid" },
  ],
  lehed: [
    { href: "/pur-vahu-hind", label: "Pur vahu hind" },
    { href: "/tehtud-tood", label: "Tehtud tööd" },
    { href: "/remondilaen", label: "LHV remondilaen" },
    { href: "/materjalid", label: "Materjalid" },
    { href: "/kontakt", label: "Kontakt" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-lg font-bold text-slate-900">{company.siteName}</p>
            <p className="mt-2 text-sm text-slate-600">
              {company.name}. PUR soojustus ja polükarbamiid hüdroisolatsioon Eestis.
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Reg. kood: {company.regCode} · KMKR: {company.vatNumber}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Teenused</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.teenused.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-600 hover:text-slate-900">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Lehed</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.lehed.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-600 hover:text-slate-900">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Kontakt</h3>
            <ul className="mt-4 space-y-2 text-slate-600">
              <li>
                <a href={`tel:${company.phone.replace(/\s/g, "")}`} className="hover:text-slate-900">
                  {company.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${company.email}`} className="hover:text-slate-900">
                  {company.email}
                </a>
              </li>
              <li>
                <Link href="/kontakt" className="hover:text-slate-900">
                  Küsi pakkumist
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-200 pt-8 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} {company.name}. Kõik õigused kaitstud.</p>
        </div>
      </div>
    </footer>
  );
}
