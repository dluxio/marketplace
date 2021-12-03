import React, { useEffect, useState } from "react";

import { useRecoilValue } from "recoil";
import { apiLinkState } from "../../atoms";
import axios from "axios";
import { ChartCanvas, Chart } from "react-stockcharts";
import { CandlestickSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { scaleTime } from "d3-scale";
import { last, timeIntervalBarWidth } from "react-stockcharts/lib/utils";

import { parseData } from "../../utils";
import { utcDay } from "d3-time";

export const DEXChart = ({ coin }: { coin: "HIVE" | "HBD" }) => {
  const apiLink: string = useRecoilValue(apiLinkState);
  const [chartData, setChartData] = useState<any>();

  useEffect(() => {
    axios.get(`${apiLink}dex`).then(({ data }) => {
      console.log(data);
      coin === "HIVE"
        ? setChartData(parseData(data.markets.hive.days))
        : setChartData(parseData(data.markets.hbd.days));
    });
  }, [coin]);

  const xAccessor = (d: any) => d.date;

  return chartData ? (
    <div style={{ height: "50vh" }}>
      <ChartCanvas
        height={450}
        ratio={100}
        width={1700}
        type={"hybrid"}
        seriesName="MSFT"
        data={chartData}
        xScale={scaleTime()}
        xAccessor={xAccessor}
        xExtents={[xAccessor(chartData[0]), xAccessor(last(chartData))]}
      >
        <Chart
          id={1}
          yExtents={(d: {
            date: Date;
            open: number;
            high: number;
            low: number;
            close: number;
            volume: number;
          }) => [d.high, d.low]}
        >
          <XAxis axisAt="bottom" orient="bottom" ticks={6} />
          <YAxis axisAt="left" orient="left" ticks={5} />
          <CandlestickSeries width={timeIntervalBarWidth(utcDay)} />
        </Chart>
      </ChartCanvas>
    </div>
  ) : (
    <div className="text-center text-white text-xl">Loading charts...</div>
  );
};
