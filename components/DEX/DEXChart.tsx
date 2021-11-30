import React, { useEffect, useState } from "react";
import { scaleTime } from "d3-scale";
import { utcDay } from "d3-time";

import { ChartCanvas, Chart } from "react-stockcharts";
import { CandlestickSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { last, timeIntervalBarWidth } from "react-stockcharts/lib/utils";

export const DEXChart = ({
  coin,
  width,
  ratio,
  type,
}: {
  coin: string;
  width: number;
  ratio: number;
  type: "svg" | "hybrid";
}) => {
  const [dataSource, setDataSource] = useState([]);
  const [xExtents, setXExtents] = useState<any[]>();

  const xAccessor = (d: any) => d.date;

  useEffect(() => {
    setXExtents([
      xAccessor(last(dataSource)),
      xAccessor(dataSource[dataSource.length - 100]),
    ]);

    console.log("Should get chart data for ", coin);
  }, []);

  return (
    <ChartCanvas
      height={400}
      ratio={ratio}
      width={width}
      margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
      type={type}
      seriesName="MSFT"
      data={dataSource}
      xAccessor={xAccessor}
      xScale={scaleTime()}
      xExtents={xExtents}
    >
      <Chart id={1} yExtents={(d: any) => [d.high, d.low]}>
        <XAxis axisAt="bottom" orient="bottom" ticks={6} />
        <YAxis axisAt="left" orient="left" ticks={5} />
        <CandlestickSeries width={timeIntervalBarWidth(utcDay)} />
      </Chart>
    </ChartCanvas>
  );
};
