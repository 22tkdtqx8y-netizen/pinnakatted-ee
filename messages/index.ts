import type { Locale } from "@/lib/i18n";
import { isValidLocale } from "@/lib/i18n";
import { et } from "./et";
import { fi } from "./fi";

const messages = { et, fi } as const;

export type Messages = typeof et;

export function getMessages(locale: string): Messages {
  const l = isValidLocale(locale) ? locale : "et";
  return messages[l] as Messages;
}

export { et, fi };
