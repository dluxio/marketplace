import React, { useEffect, useState } from "react";

import { useRecoilValue } from "recoil";
import { apiLinkState } from "../../atoms";
import axios from "axios";
import dynamic from "next/dynamic";

import { parseData } from "../../utils";

export const DEXChart = ({ coin }: { coin: "HIVE" | "HBD" }) => {
  const apiLink: string = useRecoilValue(apiLinkState);
  const [chartData, setChartData] = useState<any>();
  const DynamicChart = dynamic(() => import("react-apexcharts"));

  useEffect(() => {
    axios.get(`${apiLink}dex`).then(({ data }) => {
      console.log(data);
      coin === "HIVE"
        ? setChartData(parseData(data.markets.hive.days))
        : setChartData(parseData(data.markets.hbd.days));
    });
  }, [coin]);

  return chartData ? (
    <div style={{ height: "50vh" }}>
      <DynamicChart
        height={"100%"}
        series={chartData.series}
        type="candlestick"
        options={{
          chart: {
            type: "candlestick",
            height: "100%",
            foreColor: "white",
          },
          title: {
            text: `${coin}/DLUX`,
            align: "left",
          },
          xaxis: {
            type: "datetime",
          },
          yaxis: {
            tooltip: {
              enabled: true,
            },
          },
        }}
      />
    </div>
  ) : (
    <div className="text-center text-white text-xl">Loading charts...</div>
  );
};
