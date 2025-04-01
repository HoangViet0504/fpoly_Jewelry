import React from "react";
import Stats from "./Stats";
import Chart from "./Chart";
import PotentialUsersChart from "./PotentialUsersChart";
import BestSellingChart from "./BestSellingChart";

export default function OverViewContent(): React.ReactElement {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "40px",
      }}
    >
      <Stats />
      <div style={{ boxShadow: "none" }} className="grid grid-cols-2">
        <Chart />
        <BestSellingChart />
      </div>
      <PotentialUsersChart />
    </div>
  );
}
