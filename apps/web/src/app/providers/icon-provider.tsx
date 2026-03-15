import { IconContext } from "@phosphor-icons/react";
import type { ReactNode } from "react";

interface IconProviderProps {
  children: ReactNode;
}

const defaultIconContext = {
  color: "currentColor",
  size: 24,
  weight: "regular" as const,
  mirrored: false,
};

export function IconProvider({ children }: IconProviderProps) {
  return (
    <IconContext.Provider value={defaultIconContext}>
      {children}
    </IconContext.Provider>
  );
}
