import { Loader2Icon } from "lucide-react";
import dynamic from "next/dynamic";
import { createPushModal } from "@/components/pushmodal/factory";
import { ModalContent } from "@/modals/common/container";
import type { ConfirmProps } from "@/modals/confirm";

const Loading = () => (
  <ModalContent className="flex items-center justify-center p-16">
    <Loader2Icon className="animate-spin" size={40} />
  </ModalContent>
);

const modals = {
  confirm: dynamic(() => import("./confirm"), {
    loading: Loading,
  }),
  expenses: dynamic(() => import("./expenses")),
  income: dynamic(() => import("./income")),
  subscriptions: dynamic(() => import("./subscriptions")),
  "payment-history": dynamic(() => import("./payment-history")),
  investments: dynamic(() => import("./investments")),
  "investment-transaction": dynamic(() => import("./investment-transaction")),
  "investment-value": dynamic(() => import("./investment-value")),
  "investment-history": dynamic(() => import("./investment-history")),
  account: dynamic(() => import("./account")),
  category: dynamic(() => import("./category")),
  tag: dynamic(() => import("./tag")),
  budget: dynamic(() => import("./budget")),
};

export const {
  pushModal,
  popModal,
  replaceWithModal,
  popAllModals,
  ModalProvider,
  useOnPushModal,
} = createPushModal({
  modals,
});

export const showConfirm = (props: ConfirmProps) => pushModal("confirm", props);
