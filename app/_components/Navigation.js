import { getServerSession } from "next-auth/next";
import { authConfig } from "../_lib/auth";
import Link from "next/link";

export default async function Navigation() {
  const session = await getServerSession(authConfig);
  console.log(session);
  
  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          {session?.user ?<Link
            href="/account"
            className="hover:text-accent-400 transition-colors"
          >
            { session?.user?.name}
          </Link>:
          <Link
            href="/account"
            className="hover:text-accent-400 transition-colors"
          >
            {"Guest Area"}
          </Link>
          }
        </li>
      </ul>
    </nav>
  );
}
