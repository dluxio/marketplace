import React, { useEffect, useState } from "react";

import { useRecoilValue } from "recoil";
import { apiLinkState } from "../../atoms";
import axios from "axios";
import { IgrFinancialChart } from "igniteui-react-charts";
import { IgrFinancialChartModule } from "igniteui-react-charts";
import { parseData } from "../../utils";
IgrFinancialChartModule.register();

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

  return chartData ? (
    <div style={{ height: "50vh" }}>
      <IgrFinancialChart
        width="100%"
        height="100%"
        isToolbarVisible={false}
        chartType="Candle"
        chartTitle={`${coin}/DLUX`}
        titleAlignment="Left"
        titleLeftMargin="25"
        titleTopMargin="10"
        titleBottomMargin="10"
        subtitle="Price of DLUX"
        subtitleAlignment="Left"
        subtitleLeftMargin="25"
        subtitleTopMargin="5"
        subtitleBottomMargin="10"
        yAxisLabelLocation="OutsideLeft"
        yAxisMode="Numeric"
        yAxisTitle={"Price in " + coin}
        yAxisTitleLeftMargin="10"
        yAxisTitleRightMargin="5"
        yAxisLabelLeftMargin="0"
        zoomSliderType="None"
        titleTextColor="white"
        xAxisLabelTextColor="white"
        subtitleTextColor="white"
        yAxisLabelTextColor="white"
        yAxisTitleTextColor="white"
        dataSource={chartData}
      />
    </div>
  ) : (
    <div className="text-center text-white text-xl">Loading charts...</div>
  );
};
