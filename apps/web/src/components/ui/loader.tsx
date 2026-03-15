import { CircleNotchIcon } from "@phosphor-icons/react";

export default function Loader() {
  return (
    <div className="flex h-full items-center justify-center pt-8">
      <CircleNotchIcon className="animate-spin" weight="bold" />
    </div>
  );
}
