import type { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { XIcon } from "lucide-react";
import type { ReactNode } from "react";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { popModal } from "@/modals";

interface ModalContentProps extends DialogPrimitive.Popup.Props {
  children: ReactNode;
}

export function ModalContent({ children, ...props }: ModalContentProps) {
  return (
    <DialogContent
      className="overflow-hidden p-0 md:rounded-2xl md:border"
      {...props}
    >
      {children}
    </DialogContent>
  );
}

interface ModalHeaderProps {
  title: string | ReactNode;
  text?: string | ReactNode;
  onClose?: (() => void) | false;
  className?: string;
}

export function ModalHeader({
  title,
  text,
  onClose,
  className,
}: ModalHeaderProps) {
  return (
    <DialogHeader
      className={cn(
        "items-center justify-center border-b bg-secondary/70 p-4",
        className
      )}
    >
      <DialogTitle>{title}</DialogTitle>
      {!!text && <DialogDescription>{text}</DialogDescription>}
      {onClose !== false && (
        <DialogClose
          className="absolute top-4 right-4 rounded-full p-1 text-muted-foreground opacity-70 outline-none ring-offset-background transition-opacity hover:text-muted-foreground hover:opacity-100 focus:outline-none focus:ring-1 focus:ring-current focus:ring-offset-1 disabled:pointer-events-none data-[state=open]:bg-muted-foreground data-[state=open]:text-muted-foreground"
          onClick={() => (onClose ? onClose() : popModal())}
        >
          <XIcon className="size-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
      )}
    </DialogHeader>
  );
}
