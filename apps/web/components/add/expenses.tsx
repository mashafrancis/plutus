'use client'

import { Fragment, useMemo } from 'react'
import { toast } from 'sonner'

import AutoCompleteList from '@/components/autocomplete-list'
import { useUser } from '@/components/client-provider/auth-provider'
import Input from '@/components/ui-elements/input'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import messages from '@/constants/messages'
import { getCurrencySymbol } from '@/lib/formatter'
import { zodResolver } from '@hookform/resolvers/zod'
import debounce from 'debounce'
import { useForm } from 'react-hook-form'

import { createExpenseAction } from '@/actions/create-expense-action'
import { incrementUsageAction } from '@/actions/increment-usage-action'
import {
  type CreateExpenseFormValues,
  createExpenseSchema,
} from '@/actions/schema'
import { updateExpenseAction } from '@/actions/update-expenses-actions'
import DatePicker from '@/components/date-picker/date-picker'
import {
  expensesCategory,
  expensesPay,
  groupedExpenses,
} from '@/constants/categories'
import useMediaQuery from '@/hooks/use-media-query'
import { cn } from '@/lib/utils'
import { useAction } from 'next-safe-action/hooks'

interface AddExpenseProps {
  selected: any
  onHide: () => void
  lookup: (value: any) => void
}

const defaultValues: Partial<CreateExpenseFormValues> = {
  category: 'food',
  paid_via: 'Mpesa',
  name: '',
  notes: '',
  price: '',
  date: new Date(),
  // id: null,
  autocomplete: [],
}

export default function AddExpense({
  onHide,
  selected,
  lookup,
}: AddExpenseProps) {
  const { isDesktop } = useMediaQuery()
  const user = useUser()

  const form = useForm<CreateExpenseFormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(createExpenseSchema),
    defaultValues: { ...defaultValues },
  })

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { isSubmitting, isDirty, isValid },
  } = form

  const name = watch('name')
  const autocomplete = watch('autocomplete')

  const onLookup = useMemo(() => {
    const callbackHandler = (value: string) => {
      // @ts-expect-error
      setValue('autocomplete', lookup(value))
    }
    return debounce(callbackHandler, 500)
  }, [lookup])

  const createExpenses = useAction(createExpenseAction, {
    onSuccess: () => {
      toast.success(messages.success)
      onHide()
    },
    onError: () => {
      toast.error(messages.error)
    },
  })

  const incrementUsage = useAction(incrementUsageAction)

  const updateExpense = useAction(updateExpenseAction, {
    onSuccess: ({ status }: any) => {
      if (status === 'excluded') {
        toast.success('Expense updated successfully.', {
          duration: 3500,
          description:
            'You can view excluded transactions by adding the filter excluded.',
        })
      }
    },
    onError: () => {
      toast.error('Something went wrong please try again.', {
        duration: 3500,
      })
    },
  })

  // const handleUpdateExpense = (
  // 	values: UpdateExpenseFormValues,
  // 	optimisticData?: any,
  // ) => {
  // 	setData((prev) => {
  // 		return prev.map((item) => {
  // 			if (item.id === values.id) {
  // 				return {
  // 					...item,
  // 					...values,
  // 					...(optimisticData ?? {}),
  // 				}
  // 			}
  //
  // 			return item
  // 		})
  // 	})
  //
  // 	updateExpense.execute(values)
  // }

  const onSubmit = async (data: CreateExpenseFormValues) => {
    try {
      const isEditing = selected?.id
      if (isEditing) {
        updateExpense.execute({
          ...data,
          date: data.date.toISOString(),
          id: '',
        })
      } else {
        createExpenses.execute({
          ...data,
          date: data.date.toISOString(),
        })
        incrementUsage.execute()
      }
    } catch {
      toast.error(messages.error)
    }
  }

  return (
    <Form {...form}>
      <div className="flex flex-col items-center justify-center space-y-3 border-b bg-background px-4 py-6 pt-8 text-center md:px-8">
        <h3 className="text-2xl font-semibold">{`${
          selected.id ? 'Edit' : 'Add'
        } Expense`}</h3>
        <p className="text-foreground-lighter">
          Expenses are the main way to track your spending. You can add expenses
          manually or import them from your bank account.
        </p>
      </div>
      <form
        className="flex flex-col space-y-4 bg-secondary/70 px-4 py-8 md:px-8"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <fieldset
          disabled={isSubmitting}
          className="group md:[420px] grid w-full grid-cols-1 items-center gap-3"
        >
          <div className="relative group-disabled:opacity-90">
            <FormField
              control={control}
              name="name"
              render={({
                field: { onChange, value, ...field },
                fieldState,
              }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Fragment>
                      <Input
                        id="name"
                        className="mt-1.5"
                        placeholder="e.g. Buying some stuff"
                        autoFocus={isDesktop}
                        autoComplete="off"
                        error={fieldState?.error?.message}
                        onChange={(e) => {
                          const { value } = e.target
                          if (value.length) {
                            onChange(e)
                            if (value.length > 2) onLookup(value)
                          } else {
                            reset({
                              autocomplete: [],
                              name: '',
                              category: '',
                            })
                          }
                        }}
                        value={value}
                        {...field}
                      />
                      <AutoCompleteList
                        onHide={() => {
                          reset({ autocomplete: [] })
                        }}
                        data={autocomplete as unknown as string[]}
                        searchTerm={name.length > 2 ? name.toLowerCase() : ''}
                        onClick={({ name, _category }) => {
                          setValue('name', name)
                          reset({ autocomplete: [] })
                        }}
                        show={Boolean(autocomplete?.length)}
                      />
                    </Fragment>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-[50%_50%] gap-1 group-disabled:opacity-90">
            <FormField
              control={control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Price
                    <span className="text-foreground-lighter ml-1 text-xs">
                      (
                      {getCurrencySymbol({
                        currency: user?.currency,
                        locale: user?.locale,
                      })}
                      )
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="e.g. 500"
                      required
                      min="0"
                      step="any"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Spent Date</FormLabel>
                  <DatePicker
                    triggerButtonClassName={cn(
                      'h-9 m-0 w-full text-foreground-lighter box-border border border-control focus-visible:border-foreground-muted focus-visible:ring-background-control bg-foreground/[.026]',
                    )}
                    triggerButtonType="outline"
                    triggerButtonTitle="Pick a date"
                    // from={todayDate}
                    // to={todayDate}
                    // triggerButtonTitle={
                    //   field.value
                    //     ? format(field.value, dateFormat).toString()
                    //     : 'Pick a date'
                    // }
                    onChange={field.onChange}
                    selectsRange={false}
                    hideTime
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-[50%_50%] gap-1 group-disabled:opacity-90">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-foreground/[.026]">
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="h-96">
                      {Object.keys(groupedExpenses).map((key) => {
                        return (
                          <SelectGroup key={groupedExpenses[key]?.name}>
                            <SelectLabel>
                              {groupedExpenses[key]?.name}
                            </SelectLabel>
                            {/* @ts-expect-error */}
                            {Object.keys(groupedExpenses[key]?.list).map(
                              (listKey) => {
                                return (
                                  <SelectItem key={listKey} value={listKey}>
                                    {groupedExpenses[key]?.list[listKey]?.name}
                                  </SelectItem>
                                )
                              },
                            )}
                          </SelectGroup>
                        )
                      })}
                      <SelectItem key={'other'} value={'other'}>
                        {expensesCategory.other?.name}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paid_via"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Paid Via</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-foreground/[.026]">
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.keys(expensesPay).map((key) => {
                        return (
                          <SelectItem key={key} value={key}>
                            {expensesPay[key]?.name}
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="group-disabled:opacity-90">
            <FormField
              control={control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Notes{' '}
                    <span className="text-center text-sm text-foreground-lighter">
                      (optional)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input.TextArea
                      className="my-2 h-28"
                      maxLength={60}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            block
            disabled={isSubmitting || !isDirty || !isValid}
            htmlType="submit"
            size="medium"
            loading={createExpenses.isExecuting}
          >
            {selected?.id ? 'Update' : 'Submit'}
          </Button>
        </fieldset>
      </form>
    </Form>
  )
}
