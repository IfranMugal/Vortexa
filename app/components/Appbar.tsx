"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { div } from "framer-motion/client";

export function Appbar() {
  const session = useSession();

  return (
    <div className="bg-green-200 border-b border-green-300  px-4 py-2 mb-2">
      <div className="flex">
        <h1>Fasal</h1>
      </div>

    </div>
  );
}
