import { Appbar } from "./components/Appbar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <Link
        href="/dashboard"
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}
