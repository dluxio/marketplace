export const setColors: any = {
  dlux: '#4169e1',
  bees: '#F6BE00',
};

export const tokenColors: any = {
  hive: '#B11800',
  hive_dollar: 'green',
  ethereum: 'gray',
};

export const chartOptions: any = {
  // height: 500,
  lineHeightAnnotation: {
    always: true,
    hover: false,
    lineHeight: 1.5,
  },
  animation: {
    duration: 2000,
  },
  maintainAspectRatio: false,
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
