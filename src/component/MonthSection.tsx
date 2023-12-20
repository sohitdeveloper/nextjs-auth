"use client";

import RaceEntry from "./RaceEntry";

const MonthSection = ({ month, races }: any) => {
  return (
    <section>
      <h2 style={{ color: "green" }}>{month}</h2>
      {races.map((race: any) => (
        <RaceEntry key={race.name} race={race} />
      ))}
    </section>
  );
};

export default MonthSection;
