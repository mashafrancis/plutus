import { TrashIcon } from "@phosphor-icons/react";
import { toast } from "sonner";
import { useDeleteInvestment } from "@/entities/investment/api/use-delete-investment";
import type { InvestmentId } from "@/entities/investment/types/investment-id";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

interface DeleteInvestmentMenuItemProps {
  investmentId: InvestmentId;
}

export function DeleteInvestmentMenuItem({
  investmentId,
}: DeleteInvestmentMenuItemProps) {
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
    <DropdownMenuItem
      className="text-destructive focus:text-destructive"
      onClick={handleDelete}
    >
      <TrashIcon weight="bold" className="mr-2" />
      Delete
    </DropdownMenuItem>
  );
}
