"use client";
import { useSession, signIn } from "next-auth/react";
import React from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();

  console.log(session);
  const onLogin = async (type: String) => {
    try {
      if (type === "google") {
        signIn("google");
        router.push("/dashboard");
      }
      if (type === "normal") {
        await signIn("credentials", {
          email: "sohit@gmail.com",
          password: "password",
          redirect: true,
          callbackUrl: "/dashboard",
        }).then((res) => {
          if (res) {
            console.log(res);
          }
        });
      }
      if (type === "sign with phone") {
        router.push("/login/login-with-phone");
      }
    } catch (error: any) {
      console.log("Login failed", error.message);
    }
  };

  return (
    <div>
      Login
      <div>
        <button onClick={() => onLogin("normal")}>Sign in</button>
        <button onClick={() => onLogin("google")}>Sign in with google</button>
        <button onClick={() => onLogin("sign with phone")}>
          Sign in with phone
        </button>
      </div>
    </div>
  );
};

export default Login;
