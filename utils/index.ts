import hive from '@hiveio/hive-js';

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

export const options = {
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

type AuctionData = {
  set: string;
  uid?: string;
  price: number;
  time: number;
};

export const Auction = (username: string, nftData: AuctionData) => {
  console.log(username);
  const operations = [
    'custom_json',
    {
      required_auths: [username],
      required_posting_auths: 0,
      id: nftData.uid ? 'dlux_nft_auction' : 'dlux_ft_auction',
      json: JSON.stringify(nftData),
    },
  ];

  // @ts-ignore
  if (window.hive_keychain) {
    // @ts-ignore
    window.hive_keychain.requestBroadcast(
      username,
      [operations],
      'active',
      (response: any) => console.log(response)
    );
  }
};

export const FTOpen = (username: string, set: string) => {
  const operations = [
    'custom_json',
    {
      required_auths: [username],
      required_posting_auths: [],
      id: 'dlux_ft_mint',
      json: JSON.stringify({
        set,
      }),
    },
  ];

  // @ts-ignore
  if (window.hive_keychain) {
    // @ts-ignore
    window.hive_keychain.requestBroadcast(
      username,
      [operations],
      'active',
      (response: any) => console.log(response)
    );
  }
};

type AirdropData = {
  to: string[];
  set: string;
};

export const FTAirdrop = (username: string, ftData: AirdropData) => {
  hive.api.getAccounts([...ftData.to], (err: any, result: any) => {
    if (err) throw new Error(err);
    if (result.length === ftData.to.length) {
      const operations = [
        'custom_json',
        {
          required_auths: [username],
          required_posting_auths: [],
          id: 'dlux_ft_airdrop',
          json: JSON.stringify(ftData),
        },
      ];

      //@ts-ignore
      if (window.hive_keychain) {
        //@ts-ignore
        window.hive_keychain.requestBroadcast(
          username,
          [operations],
          'active',
          (response: any) => console.log(response)
        );
      }
    } else {
      console.log("One or more users don't exist");
    }
  });
};

type GiveData = {
  to: string;
  set: string;
  uid?: string;
};

export const Give = async (username: string, giveData: GiveData) => {
  await hive.api.getAccounts([giveData.to], (err: any, result: any) => {
    console.log(result);
    if (err) throw new Error(err);
    if (result !== []) {
      const operations = [
        'custom_json',
        {
          required_auths: [username],
          required_posting_auths: [],
          id: giveData.uid ? 'dlux_nft_transfer' : 'dlux_ft_transfer',
          json: JSON.stringify(giveData),
        },
      ];

      //@ts-ignore
      if (window.hive_keychain) {
        //@ts-ignore
        window.hive_keychain.requestBroadcast(
          username,
          [operations],
          'active',
          (response: any) => console.log(response)
        );
      }
    } else {
      console.log('No user to send to');
    }
  });
};

type SellData = {
  price: number;
  set: string;
  uid?: string;
};

export const Sell = (username: string, sellData: SellData) => {
  const operations = [
    'custom_json',
    {
      required_auths: [username],
      required_posting_auths: [],
      id: sellData.uid ? 'dlux_nft_sell' : 'dlux_ft_sell',
      json: JSON.stringify(sellData),
    },
  ];

  // @ts-ignore
  if (window.hive_keychain) {
    // @ts-ignore
    window.hive_keychain.requestBroadcast(
      username,
      [operations],
      'active',
      (response: any) => console.log(response)
    );
  }
};

type MeltData = {
  set: string;
  uid: string;
};

export const NFTMelt = (username: string, nftData: MeltData) => {
  const operations = [
    'custom_json',
    {
      required_auths: [username],
      required_posting_auths: [],
      id: 'dlux_nft_melt',
      json: JSON.stringify(nftData),
    },
  ];

  // @ts-ignore
  if (window.hive_keychain) {
    // @ts-ignore
    window.hive_keychain.requestBroadcast(
      username,
      [operations],
      'active',
      (response: any) => console.log(response)
    );
  }
};

type BuyData = {
  set: string;
  uid: string;
};

export const NFTBuy = (username: string, nftData: BuyData) => {
  const operations = [
    'custom_json',
    {
      required_auths: [username],
      required_posting_auths: [],
      id: 'dlux_nft_buy',
      json: JSON.stringify(nftData),
    },
  ];

  // @ts-ignore
  if (window.hive_keychain) {
    // @ts-ignore
    window.hive_keychain.requestBroadcast(
      username,
      [operations],
      'active',
      (response: any) => console.log(response)
    );
  }
};

export const NFTBid = (username: String, nftData: BuyData) => {
  const operations = [
    'custom_json',
    {
      required_auths: [username],
      required_posting_auths: [],
      id: 'dlux_nft_bid',
      json: JSON.stringify(nftData),
    },
  ];

  // @ts-ignore
  if (window.hive_keychain) {
    // @ts-ignore
    window.hive_keychain.requestBroadcast(
      username,
      [operations],
      'active',
      (response: any) => console.log(response)
    );
  }
};
