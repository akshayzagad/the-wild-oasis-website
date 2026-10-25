import { getServerSession } from "next-auth";
import { authConfig } from "../_lib/auth";


export const metadata = {
  title: "Your Account",
};

export default async function page() {
  const session = await getServerSession(authConfig);
  console.log(session);
  
  return (
    <h2 className="font-semibold text-2xl text-accent-400 mb-7">
     Welcome, {session?.user?.name ?? "Guest"}
    </h2>
  )
}
