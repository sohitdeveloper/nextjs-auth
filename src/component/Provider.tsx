"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";

const Provider = (props: any) => {
  return <SessionProvider>{props.children}</SessionProvider>;
};

export default Provider;
