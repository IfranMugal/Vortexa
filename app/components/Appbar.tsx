"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { motion } from "framer-motion";

export function Appbar() {
  const { data: session, status } = useSession();

  return (
    <div className="bg-green-200 border-b border-green-300 px-4 py-2 mb-2">
      <div className="flex items-center justify-between">
        {/* App name */}
        <h1 className="font-bold text-lg">Fasal</h1>

        {/* Right side: Sign in / Sign out */}
        <div>
          {status === "loading" ? (
            <span className="text-sm text-gray-600">Loading...</span>
          ) : session ? (
            <div className="flex items-center gap-3">
              {/* Show user email */}
              <span className="text-sm text-gray-700">
                {session.user?.email}
              </span>

              {/* Sign Out button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => signOut()}
                className="px-3 py-1 rounded-md bg-red-500 text-white text-sm shadow"
              >
                Sign Out
              </motion.button>
            </div>
          ) : (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => signIn("google")}
              className="px-3 py-1 rounded-md bg-green-600 text-white text-sm shadow"
            >
              Sign In
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}
