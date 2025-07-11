import dayjs from 'dayjs';
import { ChevronLeft, ChevronRight, Clock, XIcon } from 'lucide-react';
import { type PropsWithChildren, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useHotkeys } from 'react-hotkeys-hook';
import { DATA_LARGE_DATE_RANGE_DAYS_THRESHOLD } from '@/constants/time';
import { copyToClipboard } from '@/lib/copy-to-clipboard';
import { cn } from '@/lib/utils';
import type { DatetimeHelper } from '@/types/ui.types';
import { Button } from './button';
import { Label } from './label';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { RadioGroup, RadioGroupItem } from './radio-group';
import TimeSplitInput from './time-split';

export type DatePickerValue = {
  to: string;
  from: string;
  isHelper?: boolean;
  text?: string;
};

interface Props {
  value: DatePickerValue;
  onSubmit: (args: DatePickerValue) => void;
  helpers: DatetimeHelper[];
  showLive?: boolean;
}

export const DateTimePicker = ({
  onSubmit,
  helpers,
  value,
  showLive = false,
}: PropsWithChildren<Props>) => {
  const [open, setOpen] = useState(false);
  useHotkeys(
    'd',
    () => setOpen((prevState) => !prevState),
    { preventDefault: true },
    [setOpen]
  );

  // Reset the state when the popover closes
  useEffect(() => {
    if (!open) {
      setStartDate(value.from ? new Date(value.from) : null);
      setEndDate(value.to ? new Date(value.to) : new Date());

      const fromDate = value.from ? new Date(value.from) : null;
      const toDate = value.to ? new Date(value.to) : null;

      setStartTime({
        HH: fromDate?.getHours().toString().padStart(2, '0') || '00',
        mm: fromDate?.getMinutes().toString().padStart(2, '0') || '00',
        ss: fromDate?.getSeconds().toString().padStart(2, '0') || '00',
      });

      const now = new Date();
      const nowHH = now.getHours().toString().padStart(2, '0');
      const nowMM = now.getMinutes().toString().padStart(2, '0');
      const nowSS = now.getSeconds().toString().padStart(2, '0');

      setEndTime({
        HH: toDate?.getHours().toString().padStart(2, '0') || nowHH,
        mm: toDate?.getMinutes().toString().padStart(2, '0') || nowMM,
        ss: toDate?.getSeconds().toString().padStart(2, '0') || nowSS,
      });
    }
  }, [open, value]);

  const handleHelperChange = (newValue: string) => {
    const selectedHelper = helpers.find((h) => h.text === newValue);
    if (onSubmit && selectedHelper) {
      onSubmit({
        to: selectedHelper.calcTo(),
        from: selectedHelper.calcFrom(),
        isHelper: true,
        text: selectedHelper.text,
      });
    }

    setOpen((prevState) => !prevState);
  };

  const [startDate, setStartDate] = useState<Date | null>(
    value.from ? new Date(value.from) : null
  );
  const [endDate, setEndDate] = useState<Date | null>(
    value.to ? new Date(value.to) : new Date()
  );

  const [startTime, setStartTime] = useState({
    HH: startDate?.getHours().toString() || '00',
    mm: startDate?.getMinutes().toString() || '00',
    ss: startDate?.getSeconds().toString() || '00',
  });
  const [endTime, setEndTime] = useState({
    HH: endDate?.getHours().toString() || '23',
    mm: endDate?.getMinutes().toString() || '59',
    ss: endDate?.getSeconds().toString() || '59',
  });

  function handleDatePickerChange(dates: [from: Date | null, to: Date | null]) {
    const [from, to] = dates;

    setStartDate(from);
    setEndDate(to);
  }

  function handleApply() {
    const from = startDate || new Date();
    const to = endDate || new Date();

    // Add Time to the dates
    const finalFrom = new Date(
      from.setHours(+startTime.HH, +startTime.mm, +startTime.ss)
    );
    const finalTo = new Date(
      to.setHours(+endTime.HH, +endTime.mm, +endTime.ss)
    );

    onSubmit({
      from: finalFrom.toISOString(),
      to: finalTo.toISOString(),
      isHelper: false,
    });

    setOpen((prevState) => !prevState);
  }

  const [copied, setCopied] = useState(false);
  const [pasted, setPasted] = useState(false);

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }, [copied]);

  function handlePaste() {
    navigator.clipboard
      .readText()
      .then((text) => {
        try {
          const json = JSON.parse(text);

          if (!(json.from && json.to)) {
            return;
          }

          const fromDate = new Date(json.from);
          const toDate = new Date(json.to);

          // Check if dates are valid
          if (
            Number.isNaN(fromDate.getTime()) ||
            Number.isNaN(toDate.getTime())
          ) {
            return;
          }

          setStartDate(fromDate);
          setEndDate(toDate);

          // Update time states
          setStartTime({
            HH: fromDate.getHours().toString(),
            mm: fromDate.getMinutes().toString(),
            ss: fromDate.getSeconds().toString(),
          });

          setEndTime({
            HH: toDate.getHours().toString(),
            mm: toDate.getMinutes().toString(),
            ss: toDate.getSeconds().toString(),
          });

          setPasted(true);
        } catch (_error) {}
      })
      .catch((_error) => {});
  }

  function handleCopy() {
    if (!(startDate && endDate)) {
      return;
    }

    const fromDate = new Date(startDate);
    const toDate = new Date(endDate);

    // Add time from time states
    fromDate.setHours(+startTime.HH, +startTime.mm, +startTime.ss);
    toDate.setHours(+endTime.HH, +endTime.mm, +endTime.ss);

    copyToClipboard(
      JSON.stringify({
        from: fromDate.toISOString(),
        to: toDate.toISOString(),
      })
    );

    setCopied(true);
  }

  useEffect(() => {
    if (pasted) {
      setTimeout(() => {
        setPasted(false);
      }, 2000);
    }
  }, [pasted]);

  useEffect(() => {
    if (open) {
      document.addEventListener('paste', handlePaste);
      document.addEventListener('copy', handleCopy);
    }
    return () => {
      document.removeEventListener('paste', handlePaste);
      document.removeEventListener('copy', handleCopy);
    };
  }, [open, handleCopy, handlePaste]);

  const isLargeRange =
    Math.abs(dayjs(startDate).diff(dayjs(endDate), 'days')) >
    DATA_LARGE_DATE_RANGE_DAYS_THRESHOLD - 1;

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger>
        <Button
          className="cursor-pointer rounded-full bg-muted"
          variant="ghost"
        >
          <Clock size={12} />
          {value.isHelper
            ? value.text
            : `${dayjs(value.from).format('DD MMM, HH:mm')} - ${dayjs(value.to || new Date()).format('DD MMM, HH:mm')}`}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="flex w-full p-0" side="bottom">
        <RadioGroup
          className="flex flex-col gap-px border-r p-2"
          onValueChange={handleHelperChange}
          value={value.isHelper ? value.text : ''}
        >
          {helpers.map((helper) => (
            <Label
              className={cn(
                'flex cursor-pointer items-center gap-2 rounded-sm px-4 py-1.5 text-muted-foreground text-xs transition-all hover:bg-background-overlay-hover hover:text-foreground [&:has([data-state=checked])]:bg-background-overlay-hover [&:has([data-state=checked])]:text-foreground',
                {
                  'pointer-events-none cursor-not-allowed opacity-50':
                    helper.disabled,
                }
              )}
              key={helper.text}
            >
              <RadioGroupItem
                aria-disabled={helper.disabled}
                disabled={helper.disabled}
                hidden
                key={helper.text}
                value={helper.text}
              />
              {helper.text}
            </Label>
          ))}
        </RadioGroup>

        <div>
          <div className="flex items-center gap-2 p-2">
            <div className="flex flex-grow gap-2 font-mono *:flex-grow">
              <TimeSplitInput
                endDate={endDate}
                endTime={endTime}
                setEndTime={setEndTime}
                setStartTime={setStartTime}
                setTime={setStartTime}
                startDate={startDate}
                startTime={startTime}
                time={startTime}
                type="start"
              />
              <TimeSplitInput
                endDate={endDate}
                endTime={endTime}
                setEndTime={setEndTime}
                setStartTime={setStartTime}
                setTime={setEndTime}
                startDate={startDate}
                startTime={startTime}
                time={endTime}
                type="end"
              />
            </div>
            <div className="flex-shrink">
              <Button
                className="px-1"
                onClick={() => {
                  setStartTime({ HH: '00', mm: '00', ss: '00' });
                  setEndTime({ HH: '00', mm: '00', ss: '00' });
                }}
                size="icon"
                variant="ghost"
              >
                <XIcon size={14} />
              </Button>
            </div>
          </div>
          <div className="border-t p-2">
            <DatePicker
              dateFormat="MMMM d, yyyy h:mm aa"
              dayClassName={() => 'cursor-pointer'}
              endDate={endDate}
              inline
              onChange={(dates) => {
                handleDatePickerChange(dates);
              }}
              renderCustomHeader={({
                date,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
              }) => (
                <div className="flex items-center justify-between">
                  <div className="flex w-full items-center justify-between">
                    <Button
                      className="px-1.5"
                      disabled={prevMonthButtonDisabled}
                      onClick={decreaseMonth}
                      size="sm"
                      variant="ghost"
                    >
                      <ChevronLeft size={14} strokeWidth={2} />
                    </Button>
                    <span className="text-muted-foreground text-sm">
                      {dayjs(date).format('MMMM YYYY')}
                    </span>
                    <Button
                      className="px-1.5"
                      disabled={nextMonthButtonDisabled}
                      onClick={increaseMonth}
                      size="icon"
                      variant="ghost"
                    >
                      <ChevronRight size={14} strokeWidth={2} />
                    </Button>
                  </div>
                </div>
              )}
              selectsRange
              startDate={startDate}
            />
          </div>
          {isLargeRange && (
            <div className="border-warning-500 border-y bg-warning-300 px-3 py-1.5 text-warning-600 text-warning-foreground text-xs">
              Large ranges may result in memory errors for <br /> big projects.
            </div>
          )}
          <div className="flex items-center justify-end gap-2 border-t p-2">
            {startDate && endDate ? (
              <Button
                className={cn({
                  'text-primary': copied || pasted,
                })}
                onClick={handleCopy}
                size="sm"
                variant="ghost"
              >
                {copied ? 'Copied!' : pasted ? 'Pasted!' : 'Copy range'}
              </Button>
            ) : null}

            <Button
              onClick={() => {
                setStartDate(new Date());
                setEndDate(new Date());
              }}
              variant="default"
            >
              Today
            </Button>
            <Button onClick={handleApply}>Apply</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
