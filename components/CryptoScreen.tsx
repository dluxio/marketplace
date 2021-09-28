import React, { useEffect, useState } from 'react';

import { Line } from 'react-chartjs-2';

import { useRecoilValue } from 'recoil';
import { coinState } from '../atoms';

import { chartOptions } from '../constants';

export const CryptoScreen = () => {
  const [chartData, setChartData] = useState<any>();
  const coinData = useRecoilValue(coinState);
  const { id } = coinData[0];
  useEffect(() => {
    const fetchData = async () => {
      fetch(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=eur&days=1`
      )
        .then((response) => response.json())
        .then((data) =>
          setChartData({
            labels: ['1', '2', '3', '4', '5', '6'],
            datasets: [
              {
                label: 'hive',
                data: [
                  { x: 1, y: 15 },
                  { x: 2, y: 13 },
                  { x: 3, y: 25 },
                  { x: 4, y: 15 },
                  { x: 5, y: 13 },
                  { x: 6, y: 25 },
                ],
                fill: true,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgb(255, 99, 132)',
                pointRadius: 5,
              },
            ],
          })
        );
    };

    fetchData();
  }, [id]);

  useEffect(() => console.log(chartData), [chartData]);

  return (
    <div>
      <h1>Crypto</h1>
      <div className="mx-10 px-5 py-1 bg-gray-600 rounded-xl">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};
