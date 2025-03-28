'use client'
import { format } from 'date-fns'
import * as React from 'react'
import DatePicker from 'react-datepicker'
import { DayPicker } from 'react-day-picker'
import { ChevronLeft, ChevronRight } from 'react-feather'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <div className="p-2">
      <DatePicker
        inline
        // selectsRange={selectsRange as any}
        // selected={startDate}
        // onChange={(dates: any) => {
        // 	handleDatePickerChange(dates)
        // }}
        dateFormat="MMMM d, yyyy h:mm aa"
        // startDate={startDate as any}
        // endDate={endDate as any}
        // minDate={minDate}
        // maxDate={maxDate}
        dayClassName={() => 'cursor-pointer'}
        renderCustomHeader={({
          date,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className="flex items-center justify-between">
            <div className="flex w-full items-center justify-between">
              <button
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
                type="button"
                className={`
                        ${prevMonthButtonDisabled && 'cursor-not-allowed opacity-50'}
                        text-foreground-lighter hover:text-foreground focus:outline-hidden p-2
                    `}
              >
                <ChevronLeft size={16} strokeWidth={2} />
              </button>
              <span className="text-sm text-foreground-lighter">
                {format(date, 'MMMM yyyy')}
              </span>
              <button
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
                type="button"
                className={`
                        ${nextMonthButtonDisabled && 'cursor-not-allowed opacity-70'}
                        text-foreground-lighter p-2 hover:text-foreground focus:outline-hidden
                    `}
              >
                <ChevronRight size={16} strokeWidth={2} />
              </button>
            </div>
          </div>
        )}
      />
    </div>
    // <DayPicker
    //   showOutsideDays={showOutsideDays}
    //   className={cn('p-3', className)}
    //   classNames={{
    //     months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
    //     month: 'space-y-4',
    //     caption: 'flex justify-center pt-1 relative items-center',
    //     caption_label: 'text-sm font-medium',
    //     nav: 'space-x-1 flex items-center',
    //     nav_button: cn(
    //       buttonVariants({ variant: 'outline' }),
    //       'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
    //     ),
    //     nav_button_previous: 'absolute left-1',
    //     nav_button_next: 'absolute right-1',
    //     table: 'w-full border-collapse space-y-1',
    //     head_row: 'flex',
    //     head_cell:
    //       'text-foreground-lighter rounded-md w-8 font-normal text-[0.8rem]',
    //     row: 'flex w-full mt-2',
    //     cell: cn(
    //       'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md',
    //       props.mode === 'range'
    //         ? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
    //         : '[&:has([aria-selected])]:rounded-md',
    //     ),
    //     day: cn(
    //       buttonVariants({ variant: 'ghost' }),
    //       'h-8 w-8 p-0 font-normal aria-selected:opacity-100',
    //     ),
    //     day_range_start: 'day-range-start',
    //     day_range_end: 'day-range-end',
    //     day_selected:
    //       'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
    //     day_today: 'bg-accent text-accent-foreground',
    //     day_outside:
    //       'day-outside text-foreground-lighter opacity-50  aria-selected:bg-accent/50 aria-selected:text-foreground-lighter aria-selected:opacity-30',
    //     day_disabled: 'text-foreground-lighter opacity-50',
    //     day_range_middle:
    //       'aria-selected:bg-accent aria-selected:text-accent-foreground',
    //     day_hidden: 'invisible',
    //     ...classNames,
    //   }}
    //   components={{
    //     IconLeft: ({ ...props }) => <ChevronLeftIcon className="h-4 w-4" />,
    //     IconRight: ({ ...props }) => <ChevronRightIcon className="h-4 w-4" />,
    //   }}
    //   {...props}
    // />
  )
}

Calendar.displayName = 'Calendar'

export { Calendar }
