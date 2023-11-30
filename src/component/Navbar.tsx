"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  console.log("🚀 ~ file: Navbar.tsx:8 ~ Navbar ~ session:", session);

  /* @ts-ignore */
  const token = session?.jwtToken;

  const handleAuth = async () => {
    if (token) {
      await signOut({ callbackUrl: "/login" });
    } else {
      router.push("/login");
    }
  };
  return (
    <nav>
      <ul style={{ display: "flex", listStyle: "none", padding: 0 }}>
        {token && (
          <li style={{ marginRight: "10px" }}>
            <Link href="/dashboard" passHref>
              <div>Dashboard</div>
            </Link>
          </li>
        )}
        <li style={{ marginRight: "10px" }}>
          <Link href="/home" passHref>
            <div>Home</div>
          </Link>
        </li>
        <li style={{ marginRight: "10px" }}>
          <Link href="/contact" passHref>
            <div>Contact</div>
          </Link>
        </li>
        {token && (
          <li style={{ marginRight: "10px" }}>
            <Link href="/account" passHref>
              <div>Account</div>
            </Link>
          </li>
        )}

        {!token && (
          <li style={{ marginRight: "10px" }}>
            <Link href="/signup" passHref>
              <div>Signup</div>
            </Link>
          </li>
        )}
        <li>
          <button onClick={() => handleAuth()}>
            {token ? "Logout" : "Login"}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
