'use client';

import dayjs from 'dayjs';
import { type ReactNode, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  type DatePickerValue,
  DateTimePicker,
} from '@/components/ui/date-picker';
import { EXPLORER_DATEPICKER_HELPERS } from '@/constants/time';
import { useTimeQuery } from '@/hooks/use-time-query';
import type { DatePickerToFrom } from '@/types/ui.types';

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
        text: `${dayjs(defaultFrom).format('DD MMM, HH:mm')} - ${dayjs(defaultTo).format('DD MMM, HH:mm')}`,
        isHelper: false,
      };
    }
    return {
      to: EXPLORER_DATEPICKER_HELPERS[0]?.calcTo(),
      from: EXPLORER_DATEPICKER_HELPERS[0]?.calcFrom(),
      text: EXPLORER_DATEPICKER_HELPERS[0]?.text,
      isHelper: true,
    };
  }

  const [selectedDatePickerValue, setSelectedDatePickerValue] =
    useState<DatePickerValue>(getDefaultDatePickerValue());

  const handleDateChange = ({ to, from }: DatePickerToFrom) => {
    onSearch(from || '', to || '');
  };

  return (
    <header className="desktop:sticky sticky desktop:top-0 top-0 z-10 flex h-[70px] items-center justify-between desktop:rounded-t-[10px] bg-background bg-opacity-70 px-6 backdrop-blur-xl backdrop-filter md:static md:m-0 md:border-b md:backdrop-blur-none md:backdrop-filter">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-foreground text-lg">
            <ReactMarkdown disallowedElements={['p']} unwrapDisallowed>
              {title}
            </ReactMarkdown>
          </h3>
          {description && (
            <div className="text-muted-foreground text-sm">
              <ReactMarkdown>{description}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>
      <div className="md:flex md:items-center md:justify-between md:space-x-2">
        {showDatePicker ? (
          <DateTimePicker
            helpers={EXPLORER_DATEPICKER_HELPERS}
            onSubmit={(value) => {
              setSelectedDatePickerValue(value);
              handleDateChange(value);
            }}
            value={selectedDatePickerValue}
          />
        ) : null}
        {addButton}
      </div>
    </header>
  );
}
