'use client'

import { useFormState } from "react-dom"
import { logout } from "../actions/auth"

export default function Page(){

  const [state, action] = useFormState(logout, undefined)
  
  return(
    <div className="flex justify-center items-center min-h-screen gap-10 flex-col">
      <h2>Log out</h2>
      <form action={action}>
        <button className="px-2 py-1 bg-black text-red-300" type="submit">log out</button>
      </form>
    </div>
  )
}