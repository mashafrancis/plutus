import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const logoImage = "/logo.svg";

export default async function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-1 flex-col bg-muted">
      <div className="flex flex-1">
        <main className="flex flex-1 shrink-0 flex-col items-center border-border border-r bg-background px-5 pt-16 pb-8 shadow-lg">
          <div className="flex w-[330px] flex-1 flex-col justify-center sm:w-[384px]">
            <Link href="/">
              <Image
                alt="plutus-logo"
                className="rounded-sm"
                height={36}
                src={logoImage}
                width={36}
              />
            </Link>
            {children}
          </div>

          <div className="sm:text-center">
            <p className="text-muted-foreground text-xs sm:mx-auto sm:max-w-sm">
              By continuing, you agree to our{" "}
              <Link
                className="underline underline-offset-4 hover:text-primary"
                href="/terms"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                className="underline underline-offset-4 hover:text-primary"
                href="/privacy"
              >
                Privacy Policy{" "}
              </Link>
              and to receive periodic emails with updates.
            </p>
          </div>
        </main>

        <aside className="hidden flex-1 shrink basis-1/4 flex-col items-center justify-center bg-cover xl:flex">
          <div />
        </aside>
      </div>
    </div>
  );
}
