"use client";
import { useSession, signIn } from "next-auth/react";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    gapi: any;
  }
}

const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();

  console.log(session);
  const onSuccess = (googleUser: any) => {
    const id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
  };

  const onFailure = (error: any) => {
    console.error("Sign-in error:", error);
  };

  const onLogin = async (type: String) => {
    try {
      if (type === "google") {
        // signIn("google", { callbackUrl: "/dashboard" });
        // router.push("/dashboard");
        const auth2 = window.gapi.auth2.getAuthInstance();
        auth2.signIn().then(onSuccess, onFailure);
      }
      if (type === "normal") {
        try {
          const result = await signIn("credentials", {
            email: "sohit@gmail.com",
            password: "password",
            redirect: true,
            callbackUrl: "/dashboard",
          });
          console.log(result);
        } catch (error) {
          console.error("Login failed", error);
        }
      }
      if (type === "sign with phone") {
        router.push("/login/login-with-phone");
      }
    } catch (error: any) {
      console.log("Login failed", error.message);
    }
  };
  useEffect(() => {
    const initClient = () => {
      if (window.gapi) {
        window.gapi.load("auth2", () => {
          if (!window.gapi.auth2.getAuthInstance()) {
            window.gapi.auth2.init({
              client_id:
                "767583294795-964hrdj7bp4lmatnuue3jn3qtq7gd8oh.apps.googleusercontent.com",
              scope: "profile email",
            });
          }
        });
      } else {
        console.error("Error loading gapi client");
      }
    };

    initClient();
  }, []);
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
