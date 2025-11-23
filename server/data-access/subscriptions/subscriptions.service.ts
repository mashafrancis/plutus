import { format } from "date-fns";
import { Effect } from "effect";
import { dateFormat } from "@/constants/date";
import {
  calculatePaidDates,
  calculatePrevRenewalDate,
  calculateRenewalDate,
} from "@/lib/date";
import { db } from "@/lib/db/client";
import { execute } from "@/lib/db/execute";
import type {
  CreateSubscriptionSchema,
  DeleteSubscriptionSchema,
  GetSubscriptionsSchema,
  UpdateSubscriptionSchema,
} from "@/server/data-access/subscriptions/subscriptions.schema";

export class SubscriptionsService extends Effect.Service<SubscriptionsService>()(
  "SubscriptionsService",
  {
    effect: Effect.gen(function* () {
      return {
        createSubscription: ({
          name,
          notes,
          price,
          paid,
          url,
          date,
          active,
          cancelledAt,
          notify,
          userId,
        }: CreateSubscriptionSchema & { userId: string }) =>
          Effect.gen(function* () {
            return yield* execute(
              db.subscription.create({
                data: {
                  notes,
                  name,
                  price,
                  paid,
                  url,
                  date,
                  active,
                  cancelledAt,
                  notify,
                  userId,
                },
              })
            );
          }),
        getSubscriptions: ({
          to,
          from,
          userId,
        }: GetSubscriptionsSchema & { userId: string }) =>
          Effect.gen(function* () {
            const data = yield* execute(
              db.subscription.findMany({
                where: { userId },
                orderBy: { date: "desc" },
              })
            );

            let updatedDate = data.map((datum) => {
              const renewal_date = calculateRenewalDate(datum.date, datum.paid);
              const prev_renewal_date = format(
                calculatePrevRenewalDate(renewal_date, datum.paid),
                dateFormat
              );
              return {
                ...datum,
                renewal_date: format(renewal_date, dateFormat),
                prev_renewal_date,
                paid_dates: calculatePaidDates(datum, from ?? "", to ?? ""),
              };
            });

            if (from && from !== "" && to && to !== "") {
              updatedDate = updatedDate.filter(
                (datum) => datum.paid_dates?.length
              );
            }

            return updatedDate;
          }),
        updateSubscription: ({
          id,
          name,
          notes,
          price,
          paid,
          url,
          date,
          active,
          cancelledAt,
        }: UpdateSubscriptionSchema) =>
          Effect.gen(function* () {
            return yield* execute(
              db.subscription.update({
                data: {
                  notes,
                  name,
                  price,
                  date,
                  url,
                  paid,
                  active,
                  cancelledAt,
                },
                where: { id },
              })
            );
          }),
        deleteSubscription: ({ id }: DeleteSubscriptionSchema) =>
          Effect.gen(function* () {
            return yield* execute(
              db.subscription.delete({
                where: { id },
              })
            );
          }),
      };
    }),
  }
) {}
