"use client";

import MonthSection from "@/component/MonthSection";
import React, { useEffect, useState } from "react";

const Races = () => {
  const [races, setRaces] = useState<any>([]);

  function organizeRacesByMonth(races: any) {
    const currentDate = new Date();
    const currentYearMonth = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}`;

    // Sort races by date
    const sortedRaces = races.sort(
      (a: any, b: any) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    // Group sorted races by year-month
    const groupedRaces = sortedRaces.reduce((acc: any, race: any) => {
      const date = new Date(race.date);
      const yearMonth = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;
      if (!acc[yearMonth]) {
        acc[yearMonth] = [];
      }
      acc[yearMonth].push(race);
      return acc;
    }, {});

    // Convert year-month to "Month YYYY" format
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Order the groups starting from the current year-month onwards
    const orderedRacesByMonth: any = {};
    Object.keys(groupedRaces)
      .sort()
      .forEach((key) => {
        if (key >= currentYearMonth) {
          const [year, monthIndex] = key.split("-").map(Number);
          const monthName = monthNames[monthIndex - 1];
          const formattedKey = `${monthName} ${year}`;
          orderedRacesByMonth[formattedKey] = groupedRaces[key];
        }
      });

    return orderedRacesByMonth;
  }

  useEffect(() => {
    // Simulating fetch from backend
    const fetchRaces = async () => {
      const data = [
        {
          name: "Demo Race",
          date: "2023-12-27T09:30:00.000Z",
          address: {
            name: "4747 S. Broad Street",
            city: "Philadelphia",
            state: "Pennsylvania",
            country: "United States",
            zipcode: "19112",
          },
          location: {
            latitude: 28.5466575,
            longitude: 77.3999344,
          },
          events: ["Hungm", "5k run"],
        },
        {
          name: "Spring Run",
          date: "2024-04-15T08:00:00.000Z",
          address: {
            name: "123 Main Street",
            city: "Springfield",
            state: "Illinois",
            country: "United States",
            zipcode: "62701",
          },
          location: {
            latitude: 39.781721,
            longitude: -89.650148,
          },
          events: ["Spring Sprint", "10k run"],
        },
        {
          name: "Summer Fun",
          date: "2024-01-20T10:15:00.000Z",
          address: {
            name: "789 Beach Boulevard",
            city: "Miami",
            state: "Florida",
            country: "United States",
            zipcode: "33139",
          },
          location: {
            latitude: 25.790654,
            longitude: -80.130045,
          },
          events: ["Beach Dash", "Half Marathon"],
        },
        {
          name: "Autumn Challenge",
          date: "2023-10-05T14:45:00.000Z",
          address: {
            name: "456 Oak Street",
            city: "Portland",
            state: "Oregon",
            country: "United States",
            zipcode: "97201",
          },
          location: {
            latitude: 45.522734,
            longitude: -122.677445,
          },
          events: ["Fall Foliage 5k", "Trail Run"],
        },
        {
          name: "Winter Wonderland",
          date: "2023-12-20T18:00:00.000Z",
          address: {
            name: "321 Snowy Lane",
            city: "Denver",
            state: "Colorado",
            country: "United States",
            zipcode: "80202",
          },
          location: {
            latitude: 39.739235,
            longitude: -104.99025,
          },
          events: ["Frosty 10-Miler", "Snowshoe Race"],
        },
        {
          name: "City Lights Run",
          date: "2023-11-08T20:30:00.000Z",
          address: {
            name: "555 Urban Avenue",
            city: "New York",
            state: "New York",
            country: "United States",
            zipcode: "10001",
          },
          location: {
            latitude: 40.748817,
            longitude: -73.985428,
          },
          events: ["Night Glow 5k", "Cityscape Run"],
        },
        {
          name: "Mountain Madness",
          date: "2023-09-25T12:00:00.000Z",
          address: {
            name: "789 Summit Road",
            city: "Asheville",
            state: "North Carolina",
            country: "United States",
            zipcode: "28801",
          },
          location: {
            latitude: 35.595058,
            longitude: -82.551487,
          },
          events: ["Mountain Marathon", "Trail Challenge"],
        },
        {
          name: "Coastal Cruise",
          date: "2023-06-10T07:45:00.000Z",
          address: {
            name: "987 Ocean Drive",
            city: "Los Angeles",
            state: "California",
            country: "United States",
            zipcode: "90001",
          },
          location: {
            latitude: 34.052235,
            longitude: -118.243683,
          },
          events: ["Seaside 10-Miler", "Coastal Challenge"],
        },
      ];
      setRaces(data);
    };

    fetchRaces();
  }, []);

  const racesByMonth = organizeRacesByMonth(races);
  console.log("🚀 ~ file: page.tsx:207 ~ Races ~ racesByMonth:", racesByMonth);

  return (
    <div>
      <div>
        {Object.entries(racesByMonth).map(([month, races]) => (
          <MonthSection key={month} month={month} races={races} />
        ))}
      </div>
    </div>
  );
};

export default Races;
