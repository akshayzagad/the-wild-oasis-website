"use server";

import { getServerSession } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import { authConfig } from "./auth";
import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function signInAction() {
  await signIn("google", { redirect: "/account" });
}

export async function signOutAction() {
  await signOut("google", { redirect: "/" });
}

export async function updateProfile(formData) {
  console.log(formData);
  const session = await getServerSession(authConfig);
  if (!session) throw new Error("You must be logged in");
  const nationalId = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");
  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalId))
    throw new Error("Please provide a valid national ID");

  const updateData = { nationality, countryFlag, nationalId };

  const { data, error } = await supabase
    .from("guest")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) throw new Error("Guest could not be updated");

  revalidatePath("/account/profile");
}

export async function deleteReservations(bookingId) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  // throw new Error();

  const session = await getServerSession(authConfig);
  if (!session) throw new Error("You must be logged in");

  const guestBookings = await getBookings(session.user.guestId);

  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");

  const { error } = await supabase.from("booking").delete().eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");

  revalidatePath("/account/reservations");
}

export async function editReservations(formData) {
  const session = await getServerSession(authConfig);
  if (!session) throw new Error("You must be logged in");

  const numGuest = Number(formData.get("numGuest"));
  const observations = formData.get("observations");
  const bookingId = Number(formData.get("bookingId"));

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to update this booking");
  
  const { data, error } = await supabase
    .from("booking")
    .update({ numGuest, observations })
    .eq("id", bookingId)
    .eq("guestId", session.user.guestId)
    .select()
    .single();

  if (error) throw new Error("reservation could not be edited");

  revalidatePath(`/account/reservations/edit/${bookingId}`);

  revalidatePath("/account/reservations");

  redirect("/account/reservations");
}
