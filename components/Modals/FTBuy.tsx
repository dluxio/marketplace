import React, { MouseEventHandler, useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  apiLinkState,
  broadcastState,
  dlux_ccState,
  prefixState,
  userState,
} from "../../atoms";
import { ftBuyTransfer, NFTBuy } from "../../utils";
import { FormInput } from "../Utils/FormInput";
import { Formik } from "formik";
import { useTranslation } from "next-export-i18n";
import Select from "react-select";
import { customSelectStyles, selectOptions } from "../../constants";
import axios from "axios";
import { ModalWrapper } from "../Utils/ModalWrapper";

type FTBuyProps = {
  ft: {
    set: string;
    script: string;
    pricenai: { precision: number; amount: number };
    by: string;
    uid: string;
    qty: number;
  };
  token: string;
  handleClose: Function;
};

export const FTBuy = ({ ft, handleClose, token }: FTBuyProps) => {
  const [buyData, setBuyData] = useState<any>();
  const [_broadcasts, setBroadcasts] = useRecoilState<any>(broadcastState);
  const [buyCurrency, setBuyCurrency] = useState(token);
  const [hiveTick, setHiveTick] = useState(1);
  const [hbdTick, setHbdTick] = useState(1);
  const user: any = useRecoilValue(userState);
  const prefix: string = useRecoilValue(prefixState);
  const apiLink = useRecoilValue(apiLinkState);
  const cc: string = useRecoilValue(dlux_ccState);
  const { t } = useTranslation();

  const handleBuy = async () => {
    if (buyCurrency === "DLUX") {
      {
        const response: any = await NFTBuy(user.name, buyData, prefix);
        if (response) {
          if (response.success) {
            setBroadcasts((prevState: any) => [...prevState, response]);
          }
        }
      }
    } else {
      const response: any = await ftBuyTransfer(
        {
          amount: `${buyData.price} ${buyCurrency}`,
          memo: "NFT " + ft.set + ":" + ft.uid,
        },
        user.name,
        cc
      );

      if (response) {
        if (response.success) {
          setBroadcasts((prevState: any) => [...prevState, response]);
        }
      }
    }
  };

  const getPrice = (qty: number) => {
    return (
      parseFloat(
        parseFloat(
          (+ft.pricenai.amount / Math.pow(10, ft.pricenai.precision)).toString()
        ).toFixed(ft.pricenai.precision)
      ) *
      qty *
      calculateSum(buyCurrency)
    );
  };

  const calculateSum = (currency: string) => {
    if (currency === token) {
      return 1;
    } else if (currency === "HIVE") {
      return token === "HBD" ? hiveTick / hbdTick : hiveTick;
    } else if (currency === "HBD") {
      return token === "HIVE" ? hbdTick / hiveTick : hbdTick;
    } else {
      return 1 / (token === "HIVE" ? hiveTick : hbdTick);
    }
  };

  useEffect(() => {
    if (buyData) {
      handleBuy();
    }
  }, [buyData]);

  useEffect(() => {
    axios.get(`${apiLink}dex`).then(({ data }) => {
      setHiveTick(data.markets.hive.tick);
      setHbdTick(data.markets.hbd.tick);
    });
  }, []);

  return (
    <ModalWrapper handleClose={handleClose}>
      <h1 className="text-xl text-center whitespace-nowrap mb-2">How many?</h1>
      <h1 className="text-xl text-center whitespace-nowrap">
        {t("availible")}: {ft.qty}
      </h1>
      <Formik
        initialValues={{ qty: 1 }}
        validate={({ qty }) => {
          const errors: any = {};
          if (ft.qty) {
            if (ft.qty < qty) {
              errors.qty = "Not enough availible";
            }
          }
          return errors;
        }}
        onSubmit={({ qty }, { setSubmitting }) => {
          setBuyData({
            price: getPrice(qty),
            set: ft.set,
            uid: ft.uid ? ft.uid : undefined,
            currency: buyCurrency,
            qty,
          });
          setSubmitting(false);
          handleClose();
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col justify-center gap-5 text-white">
              <FormInput
                errors={errors.qty}
                handleBlur={handleBlur}
                handleChange={handleChange}
                name="qty"
                type="number"
                touched={touched.qty}
                value={values.qty}
                min={1}
              />
              <div>
                <h1 className="mb-1">Currency</h1>
                <Select
                  styles={customSelectStyles}
                  defaultValue={selectOptions[0]}
                  onChange={(e) => {
                    setBuyCurrency(e!.value);
                  }}
                  options={selectOptions}
                />
              </div>
              <button
                type="submit"
                className="rounded-lg border border-white py-1 w-2/3 px-2 bg-gray-500 focus:ring-4 mx-auto focus:outline-none focus:ring-gray-700"
              >
                {getPrice(values.qty).toFixed(2)} {buyCurrency}
              </button>
            </div>
          </form>
        )}
      </Formik>
    </ModalWrapper>
  );
};
