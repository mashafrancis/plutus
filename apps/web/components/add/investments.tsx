'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

import { incrementUsage } from '@/app/[locale]/(app)/apis'
import {
  addInvestment,
  editInvestment,
} from '@/app/[locale]/(app)/investments/apis'
import AutoCompleteList from '@/components/autocomplete-list'
import { useUser } from '@/components/client-provider/auth-provider'
import CircleLoader from '@/components/loader/circle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { investmentCategory } from '@/constants/categories'
import { dateFormat, datePattern } from '@/constants/date'
import messages from '@/constants/messages'
import { getCurrencySymbol } from '@/lib/formatter'
import { format } from 'date-fns'
import debounce from 'debounce'

interface AddInvestments {
  selected: any
  onHide: () => void
  lookup: (value: any) => void
}

const todayDate = format(new Date(), dateFormat)

const initialState = {
  category: '',
  date: todayDate,
  name: '',
  notes: '',
  price: '',
  autocomplete: [],
}

export default function AddInvestments({
  onHide,
  selected,
  lookup,
}: AddInvestments) {
  const user = useUser()
  const [state, setState] = useState<any>(initialState)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const inputRef = useRef<any>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => setState(selected.id ? selected : initialState), [selected])

  const onLookup = useMemo(() => {
    const callbackHandler = (value: string) => {
      setState((prev: any) => ({ ...prev, autocomplete: lookup(value) }))
    }
    return debounce(callbackHandler, 500)
  }, [lookup])

  const onSubmit = async () => {
    try {
      setLoading(true)
      const isEditing = selected?.id
      if (isEditing) {
        await editInvestment(state)
      } else {
        await addInvestment(state)
        await incrementUsage()
      }
      setLoading(false)
      toast({
        description: `${isEditing ? messages.updated : messages.success}`,
      })
      onHide()
      setState({ ...initialState })
    } catch {
      setLoading(false)
      toast({ description: messages.error, variant: 'destructive' })
    }
  }

  return (
    <form
      className="md:[420px] grid w-full grid-cols-1 items-center gap-3"
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit()
        if (!selected.id) setState({ ...initialState })
      }}
    >
      <div className="relative">
        <Label htmlFor="name">Name</Label>
        <Input
          className="mt-1.5"
          id="name"
          placeholder="Name or $TSLA"
          maxLength={30}
          required
          ref={inputRef}
          autoFocus
          autoComplete="off"
          onChange={({ target }) => {
            const { value } = target
            if (value.length) {
              setState({ ...state, name: value, autocomplete: [] })
              if (value.length > 2) onLookup(value)
            } else {
              setState({
                ...state,
                name: '',
                category: '',
                autocomplete: [],
              })
            }
          }}
          value={state.name}
        />
        <AutoCompleteList
          onHide={() => {
            setState({ ...state, autocomplete: [] })
          }}
          data={state.autocomplete}
          searchTerm={state.name.length > 2 ? state.name.toLowerCase() : ''}
          onClick={({ name, category }) => {
            setState({ ...state, name, category, autocomplete: [] })
          }}
          show={Boolean(state.autocomplete?.length)}
        />
      </div>
      <div className="grid grid-cols-[50%_50%] gap-1">
        <div className="mr-3">
          <Label htmlFor="price">
            Single Stock Price
            <span className="ml-2 font-mono text-xs text-foreground-lighter">
              ({getCurrencySymbol(user.currency, user.locale)})
            </span>
          </Label>
          <Input
            className="mt-1.5"
            id="price"
            type="number"
            placeholder="1000"
            required
            step="any"
            min="0"
            onChange={(event) =>
              setState({
                ...state,
                price: event.target.value,
              })
            }
            value={state.price}
          />
        </div>
        <div className="mr-3">
          <Label htmlFor="units">Units</Label>
          <Input
            className="mt-1.5"
            id="units"
            type="number"
            placeholder="10"
            required
            min="0"
            step="any"
            onChange={(event) =>
              setState({
                ...state,
                units: event.target.value,
              })
            }
            value={state.units}
          />
        </div>
      </div>
      <div className="grid grid-cols-[50%_50%] gap-1">
        <div className="mr-3">
          <Label htmlFor="date">Bought Date</Label>
          <Input
            className="mt-1.5 appearance-none"
            id="date"
            type="date"
            required
            max={todayDate}
            pattern={datePattern}
            onChange={(event) => {
              setState({ ...state, date: event.target.value })
            }}
            value={state.date}
          />
        </div>
        <div className="mr-3">
          <Label htmlFor="category">Category</Label>
          <select
            id="category"
            className="mt-1.5 flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs placeholder:text-foreground-lighter focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring"
            onChange={(event) => {
              setState({ ...state, category: event.target.value })
            }}
            value={state.category}
            required
          >
            {Object.keys(investmentCategory).map((categoryKey) => {
              return (
                <option key={categoryKey} value={categoryKey}>
                  {investmentCategory[categoryKey]}
                </option>
              )
            })}
          </select>
        </div>
      </div>
      <div>
        <Label className="mt-1 block">
          Notes{' '}
          <span className="mb-6 text-center text-sm text-foreground-lighter">
            (optional)
          </span>
        </Label>
        <Textarea
          className="mt-2 h-20"
          onChange={(event) =>
            setState({
              ...state,
              notes: event.target.value,
            })
          }
          value={state.notes}
          maxLength={60}
        />
      </div>

      <Button disabled={loading} className="mt-1.5" type="submit">
        {loading ? <CircleLoader /> : `${selected?.id ? 'Update' : 'Submit'}`}
      </Button>
    </form>
  )
}
