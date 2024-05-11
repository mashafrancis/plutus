import { ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'

import DatePicker from '@/components/date-range-picker'

interface DashboardHeaderProps {
  title: string
  description?: string
  showDatePicker?: boolean
  addButton?: ReactNode
}

export default function AppHeader({
  title,
  description,
  showDatePicker = false,
  addButton,
}: DashboardHeaderProps) {
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
            <div className="text-sm text-muted-foreground">
              <ReactMarkdown>{description}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>
      <div className="md:flex md:items-center md:justify-between md:space-x-2">
        {showDatePicker ? <DatePicker /> : null}
        {addButton}
      </div>
    </div>
  )
}
