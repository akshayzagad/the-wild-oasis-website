import GoogleSignInButton from "@/app/_components/GoogleSignInButton";

export const metadata = {
  title: "Sign in",
};

export default function SignInPage() {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center gap-6 py-12 text-center">
      <h1 className="text-3xl font-semibold">Sign in to The Wild Oasis</h1>
      <p className="text-primary-300">
        Continue with your Google account to access your guest area.
      </p>
      <GoogleSignInButton />
    </section>
  );
}
