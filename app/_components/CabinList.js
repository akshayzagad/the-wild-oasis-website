import React from "react";
import { getCabins } from "../_lib/data-service";
import CabinCard from "./CabinCard";
import { unstable_noStore as noStore } from "next/cache"

export default async function CabinList({ filter }) {
  noStore();
  
  const cabins = await getCabins();
  console.log("Cabins:", cabins); // Log the cabins data to the console

  let displayCabins = cabins;

   if(filter === "all") {
    displayCabins = cabins;
  }

  if (filter === "small") {
    displayCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);
  }

  if (filter === "medium") {
    displayCabins = cabins.filter((cabin) => cabin.maxCapacity > 3 && cabin.maxCapacity <= 6);
  }

  if (filter === "large") {
    displayCabins = cabins.filter((cabin) => cabin.maxCapacity > 6);
  }

  if (!cabins.length) return null;

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}
