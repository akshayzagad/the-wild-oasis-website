"use client";

// import { signIn } from "next-auth/react";
import { signInAction } from "../_lib/actions";

export default function GoogleSignInButton() {
  return (
    <form action={signInAction}>
    <button
      type="button"
      // onClick={() => signIn("google", { callbackUrl: "/account" })}
      className="flex items-center gap-6 border border-primary-300 px-10 py-4 text-lg font-medium"
    >
      <img
        src="https://authjs.dev/img/providers/google.svg"
        alt=""
        height="24"
        width="24"
      />
      <span>Continue with Google</span>
    </button>
    </form>
  );
}
