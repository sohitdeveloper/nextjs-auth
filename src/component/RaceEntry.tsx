"use client";

const RaceEntry = ({ race }: any) => {
  const date = new Date(race.date);
  const dateString = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;

  return (
    <div
      className="races_bg"
      style={{ border: "1px solid black", marginBottom: "15px" }}
    >
      <h4>{race.name}</h4>
      <p>{dateString}</p>
      <p>
        {race.address.city}, {race.address.state}
      </p>
    </div>
  );
};

export default RaceEntry;
