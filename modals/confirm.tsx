import {ModalContent, ModalHeader} from "@/modals/common/container"
import {popModal} from "."
import {DialogFooter} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";

export type ConfirmProps = {
	title: string
	text: string
	onConfirm: () => void
	onCancel?: () => void
}

export default function Confirm({
	                                title,
	                                text,
	                                onConfirm,
	                                onCancel,
                                }: ConfirmProps) {
	return (
		<ModalContent>
			<ModalHeader className="items-start justify-start" title={title}/>
			<div className="items-center justify-center px-4 py-4">
				<p className="text-muted-foreground">{text}</p>
			</div>
			<DialogFooter
				className="items-center justify-center border-t bg-secondary/70 px-4 py-2">
				<Button
					onClick={() => {
						popModal("confirm")
						onCancel?.()
					}}
					variant="outline"
				>
					Cancel
				</Button>
				<Button
					onClick={() => {
						popModal("confirm")
						onConfirm()
					}}
					variant="destructive"
				>
					Yes please
				</Button>
			</DialogFooter>
		</ModalContent>
	)
}
