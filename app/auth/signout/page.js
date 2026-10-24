import SignOutButton from "@/app/_components/SignOutButton";

export const metadata = {
  title: "Sign ",
};

export default function signOutPage() {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center gap-6 py-12 text-center">
      <h1 className="text-3xl font-semibold">Are you sure Sign out The Wild Oasis</h1>
      {/* <p className="text-primary-300">
        Continue with your Google account to access your guest area.
      </p> */}
      < SignOutButton/>
    </section>
  );
}
