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
                backgroundColor:
                  id === 'hive'
                    ? 'rgba(255, 99, 132, 0.5)'
                    : id === 'ethereum'
                    ? 'rgba(211, 211, 211, 0.5)'
                    : 'rgba(123, 239, 178, 0.5)',
                borderColor:
                  id === 'hive'
                    ? 'rgba(255, 99, 132)'
                    : id === 'ethereum'
                    ? 'rgba(211, 211, 211)'
                    : 'rgba(123, 239, 178)',
                pointRadius: 5,
              },
            ],
          });
        });
    };

    fetchData();
  }, [id]);

  return (
    <div className="w-full flex justify-center">
      <div className="sm:mx-10 w-full sm:m-2 px-5 py-1 bg-gray-600 rounded-xl">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};
