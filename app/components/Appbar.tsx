"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import { motion } from "framer-motion";

export function Appbar() {
  const session = useSession();

  return (
    <div className="flex justify-between items-center px-6 py-3 bg-gradient-to-r from-purple-700 via-indigo-500 to-blue-600 shadow-lg rounded-b-2xl">
      {/* Rotating Logo + Heading */}
      <div className="flex items-center gap-3">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
          className="text-3xl"
        >
          ⚡
        </motion.div>
        <h1 className="font-extrabold text-3xl tracking-wide text-white drop-shadow-lg">
          Vortexa
        </h1>
      </div>

      {/* Auth Buttons */}
      <div>
        {session.data?.user && (
          <button
            onClick={() => signOut()}
            className="px-4 py-2 bg-white/20 text-white font-medium rounded-full border border-white/30 hover:bg-white/30 transition-colors backdrop-blur-sm"
          >
            Sign Out
          </button>
        )}
        {!session.data?.user && (
          <button
            onClick={() => signIn()}
            className="px-4 py-2 bg-white/20 text-white font-medium rounded-full border border-white/30 hover:bg-white/30 transition-colors backdrop-blur-sm"
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
}
