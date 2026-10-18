
import { notFound } from "next/navigation";
import {
  getCabin,
  getCabins,
} from "../../_lib/data-service";

import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { Suspense } from "react";
import Cabin from "@/app/_components/Cabin";

export async function generateMetadata({ params }) {
  const cabin = await getCabin(params.cabinId);
  if (!cabin) notFound();

  const { name } = cabin;
  return { title: `Cabin ${name}` };
}

// export async function generateStaticParams() {
//   const cabins = await getCabins();

//   const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));
//   console.log("Cabin IDs:", ids); // Log the IDs to see what is returned
//   return ids;
// }

export async function generateStaticParams() {
  const cabins = await getCabins();

  return cabins.map((cabin) => ({ cabinId: String(cabin.id) }));
}

export default async function Page({ params }) {
  const cabin = await getCabin(params.cabinId);


  if (!cabin) notFound();

  return (
    <div className="max-w-6xl mx-auto mt-8">
      
      <Cabin cabin={cabin} />
      <div>
        <h2 className="text-5xl font-semibold text-center">
          Reserve {cabin.name} today . Pay on arrival.
        </h2>
      </div>
      <Suspense fallback={<Spinner/>}  >
        <Reservation cabin={cabin} />
      </Suspense>
    </div>
  );
}
