"use client";
import React, { useEffect } from "react";

const Home = () => {
  function fetchLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const { latitude, longitude } = position.coords;
          console.log("Latitude:", latitude, "Longitude:", longitude);
        },
        function (error) {
          console.error("Error Code = " + error.code + " - " + error.message);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }
  useEffect(() => {
    fetchLocation();
  }, []);
  return <div onClick={() => fetchLocation()}>Home</div>;
};

export default Home;
