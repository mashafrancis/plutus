import type { DatetimeHelper } from "@/types/ui.types";
import dayjs from "dayjs";

export const DATA_LARGE_DATE_RANGE_DAYS_THRESHOLD = 90;

export const PREVIEWER_DATEPICKER_HELPERS: DatetimeHelper[] = [
  {
    text: "Last hour",
    calcFrom: () => dayjs().subtract(1, "hour").startOf("hour").toISOString(),
    calcTo: () => "",
    default: true,
  },
  {
    text: "Last 3 hours",
    calcFrom: () => dayjs().subtract(3, "hour").startOf("hour").toISOString(),
    calcTo: () => "",
  },
  {
    text: "Last 24 hours",
    calcFrom: () => dayjs().subtract(1, "day").startOf("day").toISOString(),
    calcTo: () => "",
  },
];

export const EXPLORER_DATEPICKER_HELPERS: DatetimeHelper[] = [
  {
    text: "Last 30 minutes",
    calcFrom: () => dayjs().subtract(30, "minute").startOf("day").toISOString(),
    calcTo: () => "",
  },
  {
    text: "Last 2 hours",
    calcFrom: () => dayjs().subtract(2, "hour").startOf("day").toISOString(),
    calcTo: () => "",
    default: true,
  },
  {
    text: "Last 6 hours",
    calcFrom: () => dayjs().subtract(6, "hour").startOf("day").toISOString(),
    calcTo: () => "",
  },
  {
    text: "Last 24 hours",
    calcFrom: () => dayjs().subtract(1, "day").startOf("day").toISOString(),
    calcTo: () => "",
  },
  {
    text: "Last 3 days",
    calcFrom: () => dayjs().subtract(3, "day").startOf("day").toISOString(),
    calcTo: () => "",
  },
  {
    text: "Last 7 days",
    calcFrom: () => dayjs().subtract(7, "day").startOf("day").toISOString(),
    calcTo: () => "",
  },
  {
    text: "Last 30 days",
    calcFrom: () => dayjs().subtract(30, "day").startOf("day").toISOString(),
    calcTo: () => "",
  },
  {
    text: "Last 90 days",
    calcFrom: () => dayjs().subtract(90, "day").startOf("day").toISOString(),
    calcTo: () => "",
  },
];

export const getDefaultHelper = (helpers: DatetimeHelper[]) =>
  helpers.find((helper) => helper.default) || helpers[0];

export const genQueryParams = (params: { [k: string]: string }) => {
  // remove keys which are empty strings, null, or undefined
  for (const k in params) {
    const v = params[k];
    if (v === null || v === "" || v === undefined) {
      delete params[k];
    }
  }
  return new URLSearchParams(params).toString();
};
