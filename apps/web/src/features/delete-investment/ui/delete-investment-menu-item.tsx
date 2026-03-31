import { TrashIcon } from "@phosphor-icons/react";
import { toast } from "sonner";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useDeleteInvestment } from "@/entities/investment/api/use-delete-investment";
import type { InvestmentId } from "@/entities/investment/types/investment-id";

interface DeleteInvestmentMenuItemProps {
  investmentId: InvestmentId;
}

export function DeleteInvestmentMenuItem({ investmentId }: DeleteInvestmentMenuItemProps) {
  const deleteInvestment = useDeleteInvestment();

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await deleteInvestment({ id: investmentId });
      toast.success("Investment deleted");
    } catch {
      toast.error("Failed to delete investment");
    }
  };

  return (
    <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={handleDelete}>
      <TrashIcon className="mr-2" weight="bold" />
      Delete
    </DropdownMenuItem>
  );
}
