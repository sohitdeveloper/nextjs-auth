// @ts-nocheck
"use client";
import { signIn, useSession } from "next-auth/react";
import React, { useState } from "react";
import axios from "axios";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../../firebase/setup";

interface CustomWindow extends Window {
  recaptchaVerifier?: RecaptchaVerifier;
}

declare let window: CustomWindow;

const LoginWithPhone = () => {
  const { data: session, update } = useSession();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);
  const [user, setUser] = useState();

  const handlePhoneNumberSubmit = async () => {
    try {
      axios
        .post("https://run.mocky.io/v3/77a7ad62-d643-4da4-840a-ea6940769e63", {
          phoneNumber,
        })
        .then((response) => {
          if (response?.data?.status) {
            // number registered
            setShowOtpField(true);
          }
        })
        .catch((err) => {});
      console.log(window);
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha", {
          size: "invisible",
        });
      }

      const confirmation = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        window.recaptchaVerifier
      );
      setUser(confirmation);
    } catch (error) {
      console.error("Error requesting OTP:", error);
    }
  };

  const handleOtpSubmit = async () => {
    try {
      const data = await user.confirm(otp);
      console.log("🚀 ~ file: page.tsx:58 ~ handleOtpSubmit ~ data:", data);
    } catch (error) {
      console.error("Invalid OTP:", error);
    }
    try {
      await signIn("credentials", {
        identifier: JSON.stringify({ phone: phoneNumber, otp: otp }),
        password: "",
        redirect: true,
        callbackUrl: "/dashboard",
      }).then((res) => {
        if (res) {
          console.log(res);
        }
      });
    } catch (error) {
      console.error("Invalid signin:", error);
    }
  };

  const handleResendOTP = async () => {
    try {
      const confirmation = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        window.recaptchaVerifier
      );
      console.log(confirmation, "user existence");
    } catch (error) {
      console.log("Error while resending otp", error);
    }
  };

  return (
    <div>
      <div>
        <h2>Enter Phone Number</h2>
        <input
          type="text"
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <button onClick={handlePhoneNumberSubmit}>Request OTP</button>
        {<div id="recaptcha"></div>}
      </div>
      {showOtpField && (
        <div>
          <h2>Enter OTP</h2>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={handleOtpSubmit}>Verify OTP</button>
          <span>
            <button onClick={handleResendOTP}>Resend OTP</button>
          </span>
        </div>
      )}
    </div>
  );
};

export default LoginWithPhone;
