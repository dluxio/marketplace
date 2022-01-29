import React, { useEffect, useState } from "react";

import { useRecoilValue } from "recoil";
import { apiLinkState, userState } from "../../atoms";

import axios from "axios";
import { BalanceCard } from "../Card/BalanceCard";
import { useTranslation } from "next-export-i18n";

export const CryptoScreen = ({ }) => {
  const [dluxBal, setDluxBal] = useState({ DLUX: 0, GOV: 0 });
  const [hiveBal, setHiveBal] = useState(0);
  const user: any = useRecoilValue(userState);
  const apiLink: string = useRecoilValue(apiLinkState);
  const { t } = useTranslation();

  useEffect(() => {
    setHiveBal(parseFloat(user.balance.split(" ")[0]));

    axios.get(`${apiLink}@${user.name}`).then(({ data }) => {
      setDluxBal({ DLUX: parseFloat(data.balance), GOV: parseFloat(data.gov) });
    });
  }, [user]);

  return (
    <div className="w-full">
      <h1 className="text-white text-xl mx-10 my-2">{t("balances")}</h1>
      <div className="grid grid-cols-2 gap-5 px-10 w-full">
        <BalanceCard currency="DLUX" balance={dluxBal} />
        <BalanceCard currency="HIVE" balance={hiveBal} />
      </div>
    </div>
  );
};
