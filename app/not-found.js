import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center gap-6 py-16 text-center">
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p className="text-lg text-primary-200">
        We couldn&apos;t find the Page you were looking for.
      </p>
      <Link
        href="/cabins"
        className="bg-accent-500 px-6 py-3 text-lg text-primary-800"
      >
        Browse cabins
      </Link>
    </main>
  );
}
