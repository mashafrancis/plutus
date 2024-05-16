import { NextResponse } from 'next/server'

import messages, { emails } from '@/constants/messages'
import { basicPlan, premiumPlan } from '@/constants/usage'
import prisma from '@/lib/prisma'
import PlanExpiredEmail from '@/packages/transactional/emails/plan-expired'
import UsageExceededEmail from '@/packages/transactional/emails/usage-limit-exceeded'
import { addYears } from 'date-fns'

import { createClient } from '@/lib/supabase/server'
import { cache } from 'react'
import resend from './email'

type UserData = {
  email: string
  basic_usage_limit_email: boolean
  premium_usage_limit_email: boolean
  premium_plan_expired_email: boolean
}

const hasPremiumPlanExpired = (billingCycleData: string) => {
  const todayDate = new Date()
  const endDateForBilling = addYears(new Date(billingCycleData), 1)
  return todayDate > endDateForBilling
}

const getUserUsageLimit = (user: any) => {
  const { billing_start_date, plan_status, usage, order_status } = user

  const isBasicUsageExceeded =
    plan_status === 'basic' && usage + 1 > basicPlan.limit
  const isPremium = plan_status === 'premium' && order_status === 'paid'
  const isPremiumUsageExceeded = isPremium && usage + 1 > premiumPlan.limit
  const isPremiumPlanExpired =
    isPremium && hasPremiumPlanExpired(billing_start_date)

  return { isBasicUsageExceeded, isPremiumUsageExceeded, isPremiumPlanExpired }
}

export const checkAuth = cache(
  // biome-ignore lint/complexity/noBannedTypes: <explanation>
  async (callback: Function, isGetMethod = true) => {
    const supabase = createClient()
    const {
      data: { user: sessionUser },
    } = await supabase.auth.getUser()

    if (sessionUser) {
      const { data: user } = await supabase
        .from('users')
        .select('*')
        .eq('id', sessionUser.id)
        .single()
      const {
        basic_usage_limit_email,
        premium_usage_limit_email,
        premium_plan_expired_email,
      } = user as UserData
      const {
        isBasicUsageExceeded,
        isPremiumUsageExceeded,
        isPremiumPlanExpired,
      } = getUserUsageLimit(user)

      if (isBasicUsageExceeded && !isGetMethod && user) {
        if (!basic_usage_limit_email) {
          try {
            await resend.emails.send({
              from: emails.from,
              subject: emails.usageLimit.basic.subject,
              to: user.email,
              react: UsageExceededEmail({ maxUsageLimit: basicPlan.limit }),
            })
            await prisma.users.update({
              where: { id: user?.id },
              data: { basic_usage_limit_email: true },
            })
          } catch (_error) {
            return NextResponse.json(
              { message: messages.serverError },
              { status: 401 },
            )
          }
        }
        return NextResponse.json(
          { message: emails.usageLimit.basic.message },
          { status: 403 },
        )
      }

      if (isPremiumPlanExpired && !isGetMethod && user) {
        if (!premium_plan_expired_email) {
          try {
            await resend.emails.send({
              from: emails.from,
              subject: emails.usageLimit.premiumExpired.subject,
              to: user.email,
              react: PlanExpiredEmail({ plan: 'Premium Plan' }),
            })
            await prisma.users.update({
              where: { id: user?.id },
              data: { premium_plan_expired_email: true },
            })
          } catch (_error) {
            return NextResponse.json(
              { message: messages.serverError },
              { status: 401 },
            )
          }
        }
        return NextResponse.json(
          { message: emails.usageLimit.premiumExpired.message },
          { status: 403 },
        )
      }

      if (isPremiumUsageExceeded && !isGetMethod && user) {
        if (!premium_usage_limit_email) {
          try {
            await resend.emails.send({
              from: emails.from,
              subject: emails.usageLimit.premium.subject,
              to: user.email,
              react: UsageExceededEmail({
                maxUsageLimit: premiumPlan.limit,
                plan: 'Premium Plan',
              }),
            })
            await prisma.users.update({
              where: { id: user?.id },
              data: { premium_usage_limit_email: true },
            })
          } catch (_error) {
            return NextResponse.json(
              { message: messages.serverError },
              { status: 401 },
            )
          }
        }
        return NextResponse.json(
          { message: emails.usageLimit.premium.message },
          { status: 403 },
        )
      }
      return callback(sessionUser)
    } else {
      return NextResponse.json(
        { message: messages.account.unauthorized },
        { status: 401 },
      )
    }
  },
)