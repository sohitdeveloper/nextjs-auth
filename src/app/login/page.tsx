"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import React from "react";
import { useRouter } from "next/navigation";
import { setCookieToken, setToken } from "@/utils/common";
const Login = () => {
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;
  const router = useRouter();

  // if (status === "loading") {
  //   return <p>Hang on there...</p>;
  // }

  // if (status === "authenticated") {
  //   return (
  //     <>
  //       <p>Signed in as {userEmail}</p>
  //       <button onClick={() => signOut()}>Sign out</button>
  //     </>
  //   );
  // }
  console.log(session);
  const onLogin = async (type: String) => {
    try {
      if (type === "google") {
        // signIn("google");
        setToken("sometoken");
        setCookieToken("jwt-token", "sometoken");
        router.push("/");
      }
      if (type === "normal") {
        // setToken("sometoken");
        // setCookieToken("jwt-token", "sometoken");
        // router.push("/");
        await signIn("credentials", {
          email: "sohit@gmail.com",
          password: "password",
          redirect: false,
          callbackUrl: "/",
        }).then((res) => {
          if (res?.error) {
            console.log("error");
          } else {
            console.log("success", res);
          }
        });
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
      </div>
    </div>
  );
};

export default Login;
