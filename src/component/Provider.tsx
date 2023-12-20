"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";
import Navbar from "./Navbar";
import { redirect, usePathname } from "next/navigation";

const publicPaths = [
  "/home",
  "/contact",
  "/signup",
  "/login",
  "/login/login-with-phone",
  "/todos",
  "/races",
];
const Provider = (props: any) => {
  const pathname = usePathname();
  // const isPublicRoute = publicPaths.includes(pathname);
  const isPublicRoute =
    publicPaths.some(
      (path) => path === pathname || pathname.startsWith(`${path}/`)
    ) || /^\/todos\/\d+$/.test(pathname);

  const { session } = props;

  return (
    <SessionProvider>
      <Navbar />
      {isPublicRoute || session?.jwtToken ? props.children : redirect("/login")}
    </SessionProvider>
  );
};

export default Provider;
