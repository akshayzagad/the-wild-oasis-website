"use server"

import { signIn, signOut } from "next-auth/react";

export async function signInAction() {
    await signIn("google",{redirect:"/account"})
}

export async function signOutAction() {
    await signOut("google",{redirect:"/"})
}

export async function updateProfile(formData){
    console.log(formData);   
}