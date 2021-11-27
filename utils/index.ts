import hive from "@hiveio/hive-js";

const _Rixits =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+=";

export const toNumber = (Base64: string) => {
  var result = 0;
  var base64 = Base64.split("");
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
    throw "The input is not valid";
  if (number < 0) throw "Can't represent negative numbers now";
  let rixit;
  let residual = Math.floor(number);
  let result = "";
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
    case "hive":
      return ["rgba(255, 99, 132)", "rgba(255, 99, 132, 0.5)"];
    case "ethereum":
      return ["rgba(211, 211, 211)", "rgba(211, 211, 211, 0.5)"];
    default:
      return ["rgba(123, 239, 178)", "rgba(123, 239, 178, 0.5)"];
  }
};

const handleBroadcastRequest = async (
  operations: any,
  username: string,
  post: string = "active"
) => {
  return new Promise((res, rej) => {
    // @ts-ignore
    if (window.hive_keychain) {
      // @ts-ignore
      window.hive_keychain.requestBroadcast(
        username,
        [operations],
        post,
        (response: any) => {
          res(response);
        }
      );
    } else {
      rej("Didn't return response");
    }
  });
};

type AuctionData = {
  set: string;
  uid?: string;
  price: number;
  time: number;
};

export const Auction = async (
  username: string,
  nftData: AuctionData,
  prefix: string = "dlux_"
) => {
  const id = `${prefix}${nftData.uid ? "nft_auction" : "ft_auction"}`;
  const operations = [
    "custom_json",
    {
      required_auths: [username],
      required_posting_auths: 0,
      id,
      json: JSON.stringify(nftData),
    },
  ];

  return await handleBroadcastRequest(operations, username);
};

export const FTOpen = async (
  username: string,
  set: string,
  prefix: string = "dlux_"
) => {
  const id = `${prefix}nft_mint`;
  const operations = [
    "custom_json",
    {
      required_auths: [username],
      required_posting_auths: 0,
      id,
      json: JSON.stringify({
        set,
      }),
    },
  ];

  return await handleBroadcastRequest(operations, username);
};

type AirdropData = {
  to: string[];
  set: string;
};

export const FTAirdrop = async (
  username: string,
  ftData: AirdropData,
  prefix: string = "dlux_"
) => {
  const id = `${prefix}ft_airdrop`;
  hive.api.getAccounts([...ftData.to], async (err: any, result: any) => {
    if (err) throw new Error(err);
    if (result.length === ftData.to.length) {
      const operations = [
        "custom_json",
        {
          required_auths: [username],
          required_posting_auths: [],
          id,
          json: JSON.stringify(ftData),
        },
      ];

      return await handleBroadcastRequest(operations, username);
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
  prefix: string = "dlux_"
) => {
  const id = `${prefix}${giveData.uid ? "nft_transfer" : "ft_transfer"}`;
  await hive.api.getAccounts([giveData.to], async (err: any, result: any) => {
    if (err) throw new Error(err);
    if (result !== []) {
      const operations = [
        "custom_json",
        {
          required_auths: [username],
          required_posting_auths: [],
          id,
          json: JSON.stringify(giveData),
        },
      ];

      return await handleBroadcastRequest(operations, username);
    } else {
      console.log("No user to send to");
    }
  });
};

type SellData = {
  price: number;
  set: string;
  uid?: string;
};

export const Sell = async (
  username: string,
  sellData: SellData,
  prefix: string = "dlux_"
) => {
  const id = `${prefix}${sellData.uid ? "nft_sell" : "ft_sell"}`;
  const operations = [
    "custom_json",
    {
      required_auths: [username],
      required_posting_auths: [],
      id,
      json: JSON.stringify(sellData),
    },
  ];

  return await handleBroadcastRequest(operations, username);
};

type MeltData = {
  set: string;
  uid: string;
};

export const NFTMelt = async (
  username: string,
  nftData: MeltData,
  prefix: string = "dlux_"
) => {
  const id = `${prefix}nft_melt`;
  const operations = [
    "custom_json",
    {
      required_auths: [username],
      required_posting_auths: [],
      id,
      json: JSON.stringify(nftData),
    },
  ];

  return await handleBroadcastRequest(operations, username);
};

type BuyData = {
  set: string;
  uid?: string;
};

export const NFTBuy = async (
  username: string,
  nftData: BuyData,
  prefix: string = "dlux_"
) => {
  const id = `${prefix}${nftData.uid ? "nft_buy" : "ft_buy"}`;
  const operations = [
    "custom_json",
    {
      required_auths: [username],
      required_posting_auths: 0,
      id,
      json: JSON.stringify(nftData),
    },
  ];

  return await handleBroadcastRequest(operations, username);
};

type BidData = {
  set: string;
  uid?: string;
  bid_amount: number;
};

export const NFTBid = async (
  username: string,
  nftData: BidData,
  prefix: string = "dlux_",
  kind: "ft" | "nft"
) => {
  const id = `${prefix}${kind}_bid`;
  const operations = [
    "custom_json",
    {
      required_auths: [username],
      required_posting_auths: [],
      id,
      json: JSON.stringify(nftData),
    },
  ];

  return await handleBroadcastRequest(operations, username);
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
      "custom_json",
      {
        required_auths: [username],
        required_posting_auths: 0,
        id: `${prefix}nft_define`,
        json: JSON.stringify(formData),
      },
    ],
  ];

  return await handleBroadcastRequest(operations, username);
};

type PFPData = {
  set: string;
  uid: string;
};

export const SetPFP = async (
  username: string,
  prefix: string,
  pfpData: PFPData
) => {
  const operations = [
    "custom_json",
    {
      required_auths: 0,
      required_posting_auths: [username],
      id: `${prefix}nft_pfp`,
      json: JSON.stringify(pfpData),
    },
  ];

  return await handleBroadcastRequest(operations, username, "posting");
};

type ReserveData = {
  price?: number;
  to: string;
  set: string;
  uid?: string;
};

export const ReserveTrade = async (
  username: string,
  prefix: string,
  reserveData: ReserveData
) => {
  await hive.api.getAccounts(
    [reserveData.to],
    async (err: any, result: any) => {
      if (err) throw new Error(err);
      if (result[0]) {
        const id = reserveData.uid
          ? `${prefix}nft_reserve_transfer`
          : `${prefix}ft_escrow`;
        const operations = [
          "custom_json",
          {
            required_auths: [username],
            required_posting_auths: [],
            id,
            json: JSON.stringify(reserveData),
          },
        ];

        return await handleBroadcastRequest(operations, username);
      }
    }
  );
};

export const ReserveRespond = async (
  username: string,
  prefix: string,
  reserveData: { set: string; uid?: string; price: number; kind: string },
  response: "cancel" | "complete"
) => {
  const id =
    reserveData.kind === "fts"
      ? `${prefix}ft_escrow_${response}`
      : response === "complete"
      ? `${prefix}nft_reserve_${response}`
      : `${prefix}nft_transfer_${response}`;

  const operations = [
    "custom_json",
    {
      required_auths: [username],
      required_posting_auths: 0,
      id,
      json: JSON.stringify({
        uid: reserveData.uid,
        price: reserveData.price,
        set: reserveData.set,
      }),
    },
  ];

  return await handleBroadcastRequest(operations, username);
};

export const handleSellCancel = async (
  nft: { set: string; uid: string; kind: string },
  username: string,
  prefix: string
) => {
  const id = `${prefix}${nft.kind}_sell_cancel`;

  const operations = [
    "custom_json",
    {
      required_auths: [username],
      required_posting_auths: 0,
      id,
      json: JSON.stringify({
        uid: nft.uid,
        set: nft.set,
      }),
    },
  ];

  return await handleBroadcastRequest(operations, username);
};

export const redoProfilePicture = (nft: { script: string; uid: string }) => {
  fetch(`https://ipfs.io/ipfs/${nft.script}?${nft.uid}`)
    .then((response) => response.text())
    .then((data) => {
      const code = `(//${data}\n)("${nft.uid}")`;
      const SVG = eval(code);
      document.getElementById(`profile-picture`)!.innerHTML = SVG.HTML;
    });
};

export const redoAccountPicture = (nft: { script: string; uid: string }) => {
  fetch(`https://ipfs.io/ipfs/${nft.script}?${nft.uid}`)
    .then((response) => response.text())
    .then((data) => {
      const code = `(//${data}\n)("${nft.uid}")`;
      const SVG = eval(code);
      document.getElementById(`account-picture`)!.innerHTML = SVG.HTML;
    });
};

export const vote = async (
  voter: string,
  author: string,
  permlink: string,
  weight: number
) => {
  const operations = [
    "vote",
    {
      voter,
      author,
      permlink,
      weight,
    },
  ];

  return await handleBroadcastRequest(operations, voter);
};

export const comment = async (data: {
  author: string;
  title: string;
  body: string;
  parent_author: string;
  parent_permlink: string;
  permlink: string;
  json_metadata: string;
}) => {
  const operations = [
    "comment",
    {
      ...data,
    },
  ];

  return await handleBroadcastRequest(operations, data.author);
};

export const replyComment = async (data: {
  author: string;
  body: string;
  parent_author: string;
  parent_permlink: string;
  permlink: string;
}) => {
  const operations = [
    "comment",
    {
      ...data,
    },
  ];

  return await handleBroadcastRequest(operations, data.author);
};

export const dexSell = async (
  data: { dlux: number; hive?: number; hbd?: number },
  username: string,
  prefix: string
) => {
  const operations = [
    "custom_json",
    {
      required_auths: [username],
      id: `${prefix}dex_sell`,
      required_posting_auths: 0,
      json: JSON.stringify({ ...data, hours: 720 }),
    },
  ];

  return await handleBroadcastRequest(operations, username);
};

export const dexBuy = async (
  data: {
    coin: string;
    amount: number;
    buyData: { rate?: number; hours: number };
  },
  username: string,
  to: string
) => {
  const operations = [
    "transfer",
    {
      required_auths: [username],
      required_posting_auths: 0,
      json: {
        from: username,
        to,
        amount: `${parseFloat((data.amount / 1000).toString()).toFixed(3)} ${
          data.coin
        }`,
        memo: JSON.stringify(data.buyData),
      },
    },
  ];

  return await handleBroadcastRequest(operations, username);
};
