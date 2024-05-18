import { AccountedDeleteEmail } from './emails/account-deleted'
import { FeedbackEmail } from './emails/feedback'
import { PlanExpiredEmail } from './emails/plan-expired'
import { SignUpEmail } from './emails/signup'
import { UsageExceededEmail } from './emails/usage-limit-exceeded'
import { WelcomeEmail } from './emails/welcome'

export { sendEmail, sendEmailHtml } from './emails/send'

export {
  WelcomeEmail,
  SignUpEmail,
  AccountedDeleteEmail,
  PlanExpiredEmail,
  UsageExceededEmail,
  FeedbackEmail,
}
