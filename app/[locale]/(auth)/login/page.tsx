import type { Metadata } from "next";
import { SignInButton } from "@/app/[locale]/(auth)/login/signin-button";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default async function Page() {
  // const session = await getSession();
  //
  // if (session?.session.id !== null) {
  //   return redirect("/console");
  // }

  return (
    <div className="flex flex-col gap-5">
      <div className="mb-6">
        <h1 className="mt-8 mb-2 text-xl lg:text-2xl">Login to Plutus</h1>
        <p className="pb-1 font-medium text-muted-foreground">
          Authenticate your account to sign in into your account.
        </p>
      </div>

      <SignInButton />
    </div>
  );
}
