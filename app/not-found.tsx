import Link from "next/link";
import { Ornament } from "@/components/sections";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[80vh] max-w-2xl flex-col items-center justify-center px-6 pt-20 text-center">
      <Ornament />
      <h1 className="display mt-8 text-6xl">Page not found</h1>
      <p className="mt-6 text-lg text-stone">
        The page you’re looking for has moved or no longer exists.
      </p>
      <Link href="/" className="btn btn-dark mt-10">
        Back to home
      </Link>
    </section>
  );
}
