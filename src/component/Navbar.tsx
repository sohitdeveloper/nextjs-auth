"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();

  /* @ts-ignore */
  const token = session?.jwtToken;

  const handleAuth = async () => {
    if (token) {
      await signOut({ redirect: true, callbackUrl: "/login" });
      router.push("/login");
    } else {
      router.push("/login");
    }
  };
  console.log(session);
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

        <li style={{ marginRight: "10px" }}>
          <Link href="/todos" passHref>
            <div>Todos</div>
          </Link>
        </li>

        <li style={{ marginRight: "10px" }}>
          <Link href="/races" passHref>
            <div>Races</div>
          </Link>
        </li>

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
