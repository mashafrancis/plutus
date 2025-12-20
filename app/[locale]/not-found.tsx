import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "404 | MXL Console",
};

export default function NotFound() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="absolute">
        <h1 className="select-none text-[14rem] text-foreground opacity-[5%] blur-xs filter transition duration-200 sm:text-[18rem] lg:text-[28rem]">
          404
        </h1>
      </div>
      <div className="flex flex-col items-center justify-center space-y-6 opacity-100 transition">
        <div className="flex flex-col items-center justify-center space-y-3 text-foreground">
          <h1 className="m-2 text-2xl">Hmm...this page doesn’t exist.</h1>
          <p className="text-center text-muted-foreground">
            But if you don't change your direction, and if you keep looking, you
            may end up where you are heading.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Button render={<Link href="/console" />} size="sm" variant="default">
            Take me home
          </Button>
        </div>
      </div>
    </div>
  );
}
