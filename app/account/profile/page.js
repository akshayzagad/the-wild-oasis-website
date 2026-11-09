import UpdateProfileForm from "@/app/_components/updateProfileForm";
import { getServerSession } from "next-auth/next";
import { authConfig } from "@/app/_lib/auth";
import { getCountries, getGuest } from "@/app/_lib/data-service";

export default async function Page() {
  const session = await getServerSession(authConfig);
  const guest = session?.user?.email
  ? await getGuest(session.user.email)
  : null;
  const countries = await getCountries();

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-4">
        Update your guest profile
      </h2>

      <p className="text-lg mb-8 text-primary-200">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>

      <UpdateProfileForm guest={guest} countries={countries} />
    </div>
  );
}