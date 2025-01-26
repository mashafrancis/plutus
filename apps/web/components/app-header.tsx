'use client'

import { type DatePickerToFrom } from '@/components/date-picker/date-picker.types'
import DatePickers from '@/components/ui/date-pickers'
import { EXPLORER_DATEPICKER_HELPERS } from '@/config/time.constants'
import { defaultDateValues } from '@/constants/date'
import { useSearchParamsState } from '@/hooks/use-search-params-state'
import { type ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'

type DashboardHeaderProps = {
  title: string
  description?: string
  showDatePicker?: boolean
  addButton?: ReactNode
} & {
  defaultTo?: string
  defaultFrom?: string
  onDateChange?: React.ComponentProps<typeof DatePickers>['onChange']
}

export default function AppHeader({
  title,
  description,
  showDatePicker = false,
  addButton,
}: DashboardHeaderProps) {
  const defaultTo = defaultDateValues.to
  const defaultFrom = defaultDateValues.from

  const [iso_timestamp_start, setIts] = useSearchParamsState('its')
  const [iso_timestamp_end, setIte] = useSearchParamsState('ite')

  const handleDateChange = ({ to, from }: DatePickerToFrom) => {
    setIts(from)
    setIte(to)
  }

  return (
    <div className="flex flex-col justify-between gap-2 md:flex-row">
      <div className="mb-6 flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-lg text-foreground">
            <ReactMarkdown unwrapDisallowed disallowedElements={['p']}>
              {title}
            </ReactMarkdown>
          </h3>
          {description && (
            <div className="text-sm text-foreground-lighter">
              <ReactMarkdown>{description}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>
      <div className="md:flex md:items-center md:justify-between md:space-x-2">
        {showDatePicker ? (
          <DatePickers
            from={iso_timestamp_start || defaultFrom}
            to={iso_timestamp_end || defaultTo}
            onChange={handleDateChange}
            helpers={EXPLORER_DATEPICKER_HELPERS}
          />
        ) : null}
        {addButton}
      </div>
    </div>
  )
}
