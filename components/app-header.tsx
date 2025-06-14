"use client";

import {
  type DatePickerValue,
  DateTimePicker,
} from "@/components/ui/date-picker";
import { EXPLORER_DATEPICKER_HELPERS } from "@/constants/time";
import { useTimeQuery } from "@/hooks/use-time-query";
import type { DatePickerToFrom } from "@/types/ui.types";
import dayjs from "dayjs";
import { type ReactNode, useState } from "react";
import ReactMarkdown from "react-markdown";

type DashboardHeaderProps = {
  title: string;
  description?: string;
  showDatePicker?: boolean;
  addButton?: ReactNode;
} & {
  defaultTo?: string;
  defaultFrom?: string;
};

export default function AppHeader({
  title,
  description,
  showDatePicker = false,
  addButton,
  defaultFrom,
  defaultTo,
}: DashboardHeaderProps) {
  const { to, from, onSearch } = useTimeQuery();

  function getDefaultDatePickerValue() {
    if (defaultFrom && defaultTo) {
      return {
        to: defaultTo || to,
        from: defaultFrom || from,
        text: `${dayjs(defaultFrom).format("DD MMM, HH:mm")} - ${dayjs(defaultTo).format("DD MMM, HH:mm")}`,
        isHelper: false,
      };
    }
    return {
      to: EXPLORER_DATEPICKER_HELPERS[0]!.calcTo(),
      from: EXPLORER_DATEPICKER_HELPERS[0]!.calcFrom(),
      text: EXPLORER_DATEPICKER_HELPERS[0]!.text,
      isHelper: true,
    };
  }

  const [selectedDatePickerValue, setSelectedDatePickerValue] =
    useState<DatePickerValue>(getDefaultDatePickerValue());

  const handleDateChange = ({ to, from }: DatePickerToFrom) => {
    onSearch(from || "", to || "");
  };

  return (
    <div className="flex flex-col justify-between gap-2 md:flex-row">
      <div className="mb-6 flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-foreground text-lg">
            <ReactMarkdown unwrapDisallowed disallowedElements={["p"]}>
              {title}
            </ReactMarkdown>
          </h3>
          {description && (
            <div className="text-foreground-lighter text-sm">
              <ReactMarkdown>{description}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>
      <div className="md:flex md:items-center md:justify-between md:space-x-2">
        {showDatePicker ? (
          <DateTimePicker
            helpers={EXPLORER_DATEPICKER_HELPERS}
            value={selectedDatePickerValue}
            onSubmit={(value) => {
              setSelectedDatePickerValue(value);
              handleDateChange(value);
            }}
          />
        ) : null}
        {addButton}
      </div>
    </div>
  );
}
