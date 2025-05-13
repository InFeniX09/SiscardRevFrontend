"use client";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session, status } = useSession(); //Usuario
  return (
    <>
      <div className="flex gap-3">
        <p>Bienvenido</p>
        <span className="text-red-500 ">{session?.user.Usuario}!</span>
      </div>
    </>
  );
}
