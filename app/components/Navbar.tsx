'use client';

import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { useAuthContext } from "../context/AuthContext";
import AuthModal from "./AuthModal";

export default function Navbar() {
  const { data } = useAuthContext();
  const { signOut } = useAuth();

  return (
    <nav className="bg-white p-2 flex justify-between">
      <Link className="font-bold text-gray-700 text-2xl px-3" href="/">
        OpenTable 
      </Link>
      <div>
        <div className="flex">
          {data ? (
            <button 
              className="bg-blue-400 text-white border p-1 px-4 rounded mr-3"
              onClick={signOut}
            >
              Sign out
            </button>
          ) : (
            <>
              <AuthModal isSignIn={true} />
              <AuthModal isSignIn={false} />
            </>
          )}
        </div>
      </div>
    </nav>
  );
}