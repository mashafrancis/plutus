const defaultCurrency = "KES";
const defaultLocale = "en-KE";
const defaultDateStyle = { day: "2-digit", month: "short" };
const _timeStyle = { hour: "numeric", minute: "numeric" };

type Currency = {
  value: number | bigint;
  currency?: string;
  locale?: any;
  maximumFractionDigits?: number;
  minimumFractionDigits?: number;
};

type Date = {
  date: string;
  locale?: string;
  dateStyle?: any;
};

export const formatCurrency = ({
  value,
  currency = defaultCurrency,
  locale = defaultLocale,
  minimumFractionDigits = 0,
  maximumFractionDigits = 2,
}: Currency): any => {
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      minimumFractionDigits,
      maximumFractionDigits,
    }).format(value);
  } catch {
    return value;
  }
};

export const formatDate = ({
  date,
  locale = defaultLocale,
  dateStyle = defaultDateStyle,
}: Date): any => {
  try {
    return new Intl.DateTimeFormat(locale, dateStyle).format(new Date(date));
  } catch {
    return date;
  }
};

export const getCurrencySymbol = ({
  currency = defaultCurrency,
  locale = defaultLocale,
  minimumFractionDigits = 0,
  maximumFractionDigits = 2,
}: Omit<Currency, "value">): string | undefined => {
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      minimumFractionDigits,
      maximumFractionDigits,
    })
      ?.formatToParts(1)
      ?.find((x) => x.type === "currency")?.value;
  } catch {
    return "";
  }
};

export const getChange = (past: number, current: number): number => {
  if (past === 0 || !past) return 100;
  const change = ((current - past) / past) * 100;
  return Math.round(Math.min(change, 100));
};

export function getInitials(value: string) {
  const formatted = value.toUpperCase().replace(/[\s.-]/g, "");

  if (formatted.split(" ").length > 1) {
    return `${formatted.charAt(0)}${formatted.charAt(1)}`;
  }

  if (value.length > 1) {
    return formatted.charAt(0) + formatted.charAt(1);
  }

  return formatted.charAt(0);
}
