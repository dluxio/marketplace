const _Rixits =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+=';

export const toNumber = (Base64: string) => {
  var result = 0;
  var base64 = Base64.split('');
  for (var e = 0; e < base64.length; e++) {
    result = result * 64 + _Rixits.indexOf(base64[e]);
  }
  return result;
};

export const toBase64 = (number: number) => {
  if (
    number !== number || // NaN !== NaN, equal true
    number === null ||
    number === Number.POSITIVE_INFINITY
  )
    throw 'The input is not valid';
  if (number < 0) throw "Can't represent negative numbers now";
  let rixit;
  let residual = Math.floor(number);
  let result = '';
  while (true) {
    rixit = residual % 64;
    result = _Rixits.charAt(rixit) + result;
    residual = Math.floor(residual / 64);
    if (residual == 0) break;
  }
  return result;
};

export const formatData = (data: any) => {
  return data.map((el: any) => {
    return {
      x: el[0],
      y: el[1],
    };
  });
};

export const getColor = (id: string) => {
  switch (id) {
    case 'hive':
      return ['rgba(255, 99, 132)', 'rgba(255, 99, 132, 0.5)'];
    case 'ethereum':
      return ['rgba(211, 211, 211)', 'rgba(211, 211, 211, 0.5)'];
    default:
      return ['rgba(123, 239, 178)', 'rgba(123, 239, 178, 0.5)'];
  }
};

export const options: any = {
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
  scaleFontColor: '#FFF',
  fontColor: '#FFF',
  scales: {
    xAxes: [
      {
        type: 'time',
        time: {
          format: 'HH:mm',
          unit: 'hour',
          unitStepSize: 1,
          displayFormats: {
            minute: 'HH:mm',
            hour: 'HH:mm',
            min: '00:00',
            max: '23:59',
          },
        },
      },
    ],
  },
};

type NftData = {
  set: string;
  uid: string;
  price: number;
  time: number;
};

export const NFTAuction = (username: string, nftData: NftData) => {
  const operations = [
    'custom_json',
    {
      required_auths: [username],
      required_posting_auths: [],
      id: 'dlux_nft_auction',
      json: JSON.stringify(nftData),
    },
  ];

  if (window.hive_keychain) {
    window.hive_keychain.requestBroadcast(
      [operations],
      'active',
      (response: any) => console.log(response)
    );
  }
};
