"use client";

import { signIn } from "next-auth/react";

export function LoginGoogle() {
  return (
    <button
      onClick={() =>
        signIn("google", {
          callbackUrl: "/painel"
        })
      }
    >
      Entrar com Google
    </button>
  );
}
