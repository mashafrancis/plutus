"use client";

import { defaultDateValues } from "@/constants/date";
import { createParser, useQueryState } from "nuqs";
import { useCallback } from "react";

export const nuqsOptions = { history: "push" } as const;

const defaultState = {
  timestampStart: defaultDateValues.from,
  timestampEnd: defaultDateValues.to,
  timeRange: "",
};

const stringWithDefault = (defaultValue: string) =>
  createParser({
    parse: (v) => v ?? defaultValue,
    serialize: (v) => v || "",
  });

export function useTimeQuery() {
  // Initialize URL query state
  const [timestampStartValue, setTimestampStartValue] = useQueryState(
    "from",
    stringWithDefault(defaultState.timestampStart).withOptions(nuqsOptions),
  );
  const [timestampEndValue, setTimestampEndValue] = useQueryState(
    "to",
    stringWithDefault(defaultState.timestampEnd).withOptions(nuqsOptions),
  );
  const [range, setTimeRange] = useQueryState(
    "range",
    stringWithDefault(defaultState.timeRange).withOptions(nuqsOptions),
  );

  const from = timestampStartValue || defaultState.timestampStart;
  const to = timestampEndValue || defaultState.timestampEnd;

  const onSearch = useCallback(
    (start: string, end: string) => {
      setTimestampStartValue(start || defaultState.timestampStart);
      setTimestampEndValue(end || defaultState.timestampEnd);
    },
    [setTimestampStartValue, setTimestampEndValue],
  );

  const onSearchRange = useCallback(
    (range: string) => {
      setTimeRange(range || defaultState.timeRange);
    },
    [setTimestampStartValue, setTimestampEndValue, setTimeRange],
  );

  return {
    from,
    to,
    range,
    onSearch,
    onSearchRange,
  };
}
