"use client";
import { signIn, useSession } from "next-auth/react";
import React, { useState } from "react";
import axios from "axios";

const LoginWithPhone = () => {
  const { data: session, update } = useSession();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);

  const handlePhoneNumberSubmit = () => {
    try {
      axios
        .post("https://run.mocky.io/v3/77a7ad62-d643-4da4-840a-ea6940769e63", {
          phoneNumber,
        })
        .then((response) => {
          if (response?.data?.status) {
            setShowOtpField(true);
          }
        })
        .catch((err) => {});
    } catch (error) {
      console.error("Error requesting OTP:", error);
      // Handle error cases (display error message, etc.)
    }
  };

  const handleOtpSubmit = async () => {
    await signIn("credentials", {
      identifier: JSON.stringify({ phone: "7004598739", otp: "237333" }),
      password: "",
      redirect: true,
      callbackUrl: "/dashboard",
    }).then((res) => {
      if (res) {
        console.log(res);
      }
    });
  };

  return (
    <div>
      {!showOtpField ? (
        <div>
          <h2>Enter Phone Number</h2>
          <input
            type="text"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <button onClick={handlePhoneNumberSubmit}>Request OTP</button>
        </div>
      ) : (
        <div>
          <h2>Enter OTP</h2>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={handleOtpSubmit}>Verify OTP</button>
        </div>
      )}
    </div>
  );
};

export default LoginWithPhone;
