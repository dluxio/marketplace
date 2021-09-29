import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

type CryptoChartProps = {
  selectedCoin: any;
};

export const CryptoChart = ({ selectedCoin: { id } }: CryptoChartProps) => {
  const [chartData, setChartData] = useState<any>({});
  const formatData = (data: any) => {
    return data.map((el: any) => {
      return {
        x: el[0],
        y: el[1],
      };
    });
  };

  const options: any = {
    lineHeightAnnotation: {
      always: true,
      hover: false,
      lineHeight: 1.5,
    },
    animation: {
      duration: 2000,
    },
    maintainAspectRatio: true,
    responsive: true,
    scales: {
      xAxes: [
        {
          type: 'time',
          distribution: 'linear',
        },
      ],
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      fetch(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=eur&days=1`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(formatData(data.prices));
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
    <div className="mx-10 m-2 px-5 py-1 bg-gray-600 rounded-xl">
      <Line data={chartData} options={options} />
    </div>
  );
};
