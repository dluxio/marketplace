import React, { useEffect, useState } from 'react';

import { Line } from 'react-chartjs-2';

import { useRecoilValue } from 'recoil';
import { coinState } from '../atoms';

import { chartOptions } from '../constants';

export const CryptoScreen = () => {
  const [chartData, setChartData] = useState<any>();
  const coinData = useRecoilValue(coinState);
  const { id } = coinData[0];

  const formatData = (data: any) => {
    return data.map((el: any) => {
      return {
        t: el[0],
        y: el[1],
      };
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      fetch(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=eur&days=1`
      )
        .then((response) => response.json())
        .then((data) => {
          setChartData({
            datasets: [
              {
                label: id,
                data: formatData(data.prices),
                fill: true,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgb(255, 99, 132)',
                pointRadius: 5,
              },
            ],
          });
        });
    };

    fetchData();
  }, [id]);

  return (
    <div>
      <h1 className="text-white text-xl mx-10 my-2">
        Crypto change in the past 24hrs
      </h1>
      <div className="mx-10 px-5 py-1 bg-gray-600 rounded-xl">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};
