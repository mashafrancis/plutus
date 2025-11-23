"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export function SignInButton() {
  const signIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/overview",
    });
  };

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-4">
        <Button
          className="w-full cursor-pointer rounded-full"
          onClick={signIn}
          size="lg"
          variant="outline"
        >
          <Icons.google className="h-4 w-4" />
          Login with Google
        </Button>
      </div>
    </div>
  );
}
