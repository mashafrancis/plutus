'use server'

import { updateUser } from '@/app/actions'
import { auth } from '@/auth'
import messages, { emails } from '@/constants/messages'
import { basicPlan, premiumPlan } from '@/constants/usage'
import db from '@plutus/db'
import { PlanExpiredEmail, UsageExceededEmail, sendEmail } from '@plutus/emails'
import { addYears } from 'date-fns'

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

export async function getUser() {
  const session = await auth()

  if (!session) {
    return {
      error: 'Unauthorized',
    }
  }
  const email = session.user?.email as string

  const user = await db.users.findFirst({ where: { email } })

  if (!user) {
    return {
      error: 'Unauthorized',
    }
  }

  const {
    basic_usage_limit_email,
    premium_usage_limit_email,
    premium_plan_expired_email,
  } = user as UserData
  const { isBasicUsageExceeded, isPremiumUsageExceeded, isPremiumPlanExpired } =
    getUserUsageLimit(user)

  if (isBasicUsageExceeded && user) {
    if (!basic_usage_limit_email) {
      try {
        await sendEmail({
          from: emails.from,
          subject: emails.usageLimit.basic.subject,
          to: [user.email],
          react: UsageExceededEmail({ maxUsageLimit: basicPlan.limit }),
        })
        await updateUser({
          id: user.id,
          data: { basic_usage_limit_email: true },
        })
      } catch (error) {
        return {
          error: error,
        }
      }
    }
    return {
      error: emails.usageLimit.basic.message,
    }
  }

  if (isPremiumPlanExpired && user) {
    if (!premium_plan_expired_email) {
      try {
        await sendEmail({
          from: emails.from,
          subject: emails.usageLimit.premiumExpired.subject,
          to: [user.email],
          react: PlanExpiredEmail({ plan: 'Premium Plan' }),
        })
        await updateUser({
          id: user.id,
          data: { premium_plan_expired_email: true },
        })
      } catch (error) {
        return {
          error: error,
        }
      }
    }
    return {
      error: emails.usageLimit.premiumExpired.message,
    }
  }

  if (isPremiumUsageExceeded && user) {
    if (!premium_usage_limit_email) {
      try {
        await sendEmail({
          from: emails.from,
          subject: emails.usageLimit.premium.subject,
          to: [user.email],
          react: UsageExceededEmail({
            maxUsageLimit: premiumPlan.limit,
            plan: 'Premium Plan',
          }),
        })
        await updateUser({
          id: user.id,
          data: { premium_usage_limit_email: true },
        })
      } catch (_error) {
        return {
          error: messages.serverError,
        }
      }
    }
    return {
      error: emails.usageLimit.premium.message,
    }
  }

  const data = await db.users.findUnique({
    where: { id: user.id },
    select: {
      currency: true,
      locale: true,
      billing_start_date: true,
      trial_start_date: true,
      order_status: true,
      usage: true,
      email: true,
      plan_status: true,
      new_signup_email: true,
    },
  })

  const isPremiumPlan =
    data?.order_status === 'paid' && data?.plan_status === 'premium'
  const isPremiumPlanEnded =
    isPremiumPlan &&
    data?.billing_start_date &&
    new Date() > addYears(new Date(data.billing_start_date), 1)
  const isPremium = isPremiumPlan && !isPremiumPlanEnded

  return { ...data, isPremium, isPremiumPlanEnded }
}
