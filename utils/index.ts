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

type AuctionData = {
  set: string;
  uid?: string;
  price: number;
  time: number;
};

export const Auction = (
  username: string,
  nftData: AuctionData,
  prefix: string = 'dlux_'
) => {
  const id = `${prefix}${nftData.uid ? 'nft_auction' : 'ft_auction'}`;
  const operations = [
    'custom_json',
    {
      required_auths: [username],
      required_posting_auths: 0,
      id,
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
      (response: any) => response
    );
  }
};

export const FTOpen = (
  username: string,
  set: string,
  prefix: string = 'dlux_'
) => {
  const id = `${prefix}ft_mint`;
  const operations = [
    'custom_json',
    {
      required_auths: [username],
      required_posting_auths: 0,
      id,
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
      (response: any) => response
    );
  }
};

type AirdropData = {
  to: string[];
  set: string;
};

export const FTAirdrop = (
  username: string,
  ftData: AirdropData,
  prefix: string = 'dlux_'
) => {
  const id = `${prefix}ft_airdrop`;
  hive.api.getAccounts([...ftData.to], (err: any, result: any) => {
    if (err) throw new Error(err);
    if (result.length === ftData.to.length) {
      const operations = [
        'custom_json',
        {
          required_auths: [username],
          required_posting_auths: [],
          id,
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
          (response: any) => response
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

export const Give = async (
  username: string,
  giveData: GiveData,
  prefix: string = 'dlux_'
) => {
  const id = `${prefix}${giveData.uid ? 'nft_transfer' : 'ft_transfer'}`;
  await hive.api.getAccounts([giveData.to], (err: any, result: any) => {
    console.log(result);
    if (err) throw new Error(err);
    if (result !== []) {
      const operations = [
        'custom_json',
        {
          required_auths: [username],
          required_posting_auths: [],
          id,
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
          (response: any) => response
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

export const Sell = (
  username: string,
  sellData: SellData,
  prefix: string = 'dlux_'
) => {
  const id = `${prefix}${sellData.uid ? 'nft_sell' : 'ft_sell'}`;
  const operations = [
    'custom_json',
    {
      required_auths: [username],
      required_posting_auths: [],
      id,
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
      (response: any) => response
    );
  }
};

type MeltData = {
  set: string;
  uid: string;
};

export const NFTMelt = (
  username: string,
  nftData: MeltData,
  prefix: string = 'dlux_'
) => {
  const id = `${prefix}nft_melt`;
  const operations = [
    'custom_json',
    {
      required_auths: [username],
      required_posting_auths: [],
      id,
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
      (response: any) => response
    );
  }
};

type BuyData = {
  set: string;
  uid: string;
};

export const NFTBuy = (
  username: string,
  nftData: BuyData,
  prefix: string = 'dlux_'
) => {
  const id = `${prefix}nft_buy`;
  const operations = [
    'custom_json',
    {
      required_auths: [username],
      required_posting_auths: 0,
      id,
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
      (response: any) => response
    );
  }
};

type BidData = {
  set: string;
  uid?: string;
  bid_amount: number;
};

export const NFTBid = (
  username: string,
  nftData: BidData,
  prefix: string = 'dlux_'
) => {
  const id = `${prefix}nft_bid`;
  const operations = [
    'custom_json',
    {
      required_auths: [username],
      required_posting_auths: [],
      id,
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
      (response: any) => response
    );
  }
};

type NFTCreateData = {
  name: string;
  type: number;
  script: string;
  permlink: string;
  start: string;
  end: string;
  royalty: string;
  handling: string;
  max_fee: number;
  bond: number;
};

export const NFTCreate = async (
  username: string,
  prefix: string,
  formData: NFTCreateData
) => {
  const operations = [
    [
      'custom_json',
      {
        required_auths: [username],
        required_posting_auths: 0,
        id: `${prefix}nft_define`,
        json: JSON.stringify(formData),
      },
    ],
  ];

  // @ts-ignore
  if (window.hive_keychain) {
    // @ts-ignore
    window.hive_keychain.requestBroadcast(
      username,
      operations,
      'active',
      (response: any) => response
    );
  }
};
