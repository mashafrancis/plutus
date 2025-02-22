'use client'

import { useDate } from '@/components/client-provider/datepicker-provider'
import DatePicker from '@/components/date-picker/date-picker'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { addDays, startOfMonth, startOfYear, subDays } from 'date-fns'

export default function DateRangePicker() {
  const { date, onChange } = useDate()

  return (
    <div className="flex">
      <DatePicker to={date.to} from={date.from} onChange={onChange} />
      <DatePickerSelect onChange={onChange} selectedValue={date?.selected} />
    </div>
  )
}

function DatePickerSelect({
  onChange,
  selectedValue,
}: {
  onChange: any
  selectedValue: string
}) {
  return (
    <Select
      value={selectedValue}
      onValueChange={(selected) => {
        switch (selected) {
          case 'tdy': {
            onChange({
              selected,
              from: addDays(new Date(), 0),
              to: addDays(new Date(), 0),
            })
            break
          }
          case '7days': {
            onChange({
              selected,
              to: addDays(new Date(), 0),
              from: subDays(new Date(), 7),
            })
            break
          }
          case '30days': {
            onChange({
              selected,
              from: subDays(new Date(), 30),
              to: addDays(new Date(), 0),
            })
            break
          }
          case 'm': {
            onChange({
              selected,
              from: startOfMonth(new Date()),
              to: addDays(new Date(), 0),
            })
            break
          }
          case 'y': {
            onChange({
              selected,
              from: startOfYear(new Date()),
              to: addDays(new Date(), 0),
            })
            break
          }
        }
      }}
    >
      <SelectTrigger className="w-full min-w-[120px] rounded-l-none border-border! bg-background p-2 shadow-none hover:bg-accent focus:ring-0 focus-visible:ring-1! focus-visible:ring-gray-400! dark:bg-muted dark:hover:opacity-[0.8]">
        <SelectValue className="truncate" placeholder="Select" />
      </SelectTrigger>
      <SelectContent className="border-border!" position="popper">
        <SelectItem value="none">Select</SelectItem>
        <SelectItem value="tdy">Today</SelectItem>
        <SelectItem value="7days">Last 7 days</SelectItem>
        <SelectItem value="30days">Last 30 days</SelectItem>
        <SelectItem value="m">Month to Date</SelectItem>
        <SelectItem value="y">Year to Date</SelectItem>
      </SelectContent>
    </Select>
  )
}
