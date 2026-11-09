"use client";
import Image from "next/image";
import { useState } from "react";
import { updateProfile } from '../_lib/actions';
import SubmitButton from "./SubmitButton";

export default function UpdateProfileForm({ guest, countries }) {
  const nationality = guest?.nationality?.split("%")[0].trim().toLowerCase();
  const [selectedCountry, setSelectedCountry] = useState(() =>
    countries.find(
      (country) => country.name.toLowerCase() === nationality
    ) ?? null
  );

  return (
    <div>
      <form action={updateProfile} className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col">
        <div className="space-y-2">
          <label htmlFor="fullName">Full name</label>
          <input
            name="fullName"
            disabled
            id="fullName"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
            defaultValue={guest?.fullName ?? ""}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email">Email address</label>
          <input
            name="email"
            disabled
            id="email"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
            defaultValue={guest?.email ?? ""}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="nationality">Where are you from?</label>
            {selectedCountry && (
              <Image
                src={selectedCountry.flag}
                alt={`${selectedCountry.name} flag`}
                width={32}
                height={20}
                className="h-5 w-8 rounded-sm object-cover"
              />
            )}
          </div>

          <select
            name="nationality"
            id="nationality"
            value={
              selectedCountry
                ? `${selectedCountry.name}%${selectedCountry.flag}`
                : ""
            }
            onChange={(event) => {
              const [name, flag] = event.target.value.split("%");
              setSelectedCountry(name ? { name, flag } : null);
            }}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          >
            <option value="">Select country...</option>
            {countries.map((country) => (
              <option
                key={country.name}
                value={`${country.name}%${country.flag}`}
              >
                {country.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="nationalID">National ID number</label>
          <input
            name="nationalID"
            id="nationalID"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
           <SubmitButton pendingLabel="Updating...">Update profile</SubmitButton>
        </div>
      </form>
    </div>
  )
}
