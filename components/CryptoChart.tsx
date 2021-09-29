import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { formatData, getColor, options } from '../utils';

type CryptoChartProps = {
  selectedCoin: any;
};

export const CryptoChart = ({ selectedCoin: { id } }: CryptoChartProps) => {
  const [chartData, setChartData] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      fetch(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=eur&days=1`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(formatData(data.prices));
          setChartData({
            labels: [
              '00:00',
              '01:15',
              '02:00',
              '03:20',
              '04:00',
              '05:00',
              '06:00',
              '07:00',
              '08:00',
              '09:00',
              '10:00',
              '11:00',
              '12:00',
              '13:00',
              '14:00',
              '15:00',
              '16:00',
              '17:00',
              '18:00',
              '23:59',
            ],
            datasets: [
              {
                label: id,
                data: formatData(data.prices),
                fill: true,
                backgroundColor: getColor(id)[1],
                borderColor: getColor(id)[0],
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
