import SubmitButton from "@/app/_components/SubmitButton";
import { editReservations } from "@/app/_lib/actions";
import { getBooking, getCabin } from "@/app/_lib/data-service";

export const dynamic = "force-dynamic";

export default async function Page({params}) {
    const { reservationId } = await params;
   
    const {numGuest,observations,cabinId} = await getBooking(reservationId); // Fetch the reservation details using the reservationId
  
    const { maxCapacity } = await getCabin(cabinId);
  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{reservationId}
      </h2>

      <form action={editReservations} className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col">
        <input type="hidden" name="bookingId" value={reservationId} />
        <div className="space-y-2">
          <label htmlFor="numGuest">How many guests?</label>
          <select
            name="numGuest"
            id="numGuest"
            defaultValue={numGuest}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <input
            name="observations"
            id="observations"
            type="text"
            defaultValue={observations}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          {/* <button className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
            Update reservation
          </button> */}
          <SubmitButton pendingLabel="Updating reservation...">
            Update reservation
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}