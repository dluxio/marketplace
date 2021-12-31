import React, { useState, useEffect, MouseEventHandler } from "react";

import { Formik } from "formik";
import { FormInput } from "../Utils/FormInput";
import { ImCross } from "react-icons/im";

import { useRecoilValue, useRecoilState } from "recoil";
import { userState, prefixState, broadcastState } from "../../atoms";

import { Auction } from "../../utils";
import { useTranslation } from "next-export-i18n";
import Select from "react-select";
import { customSelectStyles, selectOptions } from "../../constants";

export const AuctionNFTForm: React.FC<{
  set: string;
  uid: string;
  kind: string;
  handleClose: Function;
}> = ({ set, handleClose, uid, kind }) => {
  const [currency, setCurrency] = useState("DLUX");
  const [_broadcasts, setBroadcasts] = useRecoilState<any>(broadcastState);
  const user: any = useRecoilValue(userState);
  const prefix: string = useRecoilValue(prefixState);
  const { t } = useTranslation();
  const [auctionData, setAuctionData] = useState<{
    set: string;
    uid: string;
    time: number;
    price: number;
    type: string;
    kind: string;
  }>();

  useEffect(() => {
    if (auctionData) {
      Auction(user.name, auctionData, prefix).then((response: any) => {
        if (response) {
          if (response.success) {
            setBroadcasts((prevState: any) => [...prevState, response]);
          }
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auctionData]);

  return (
    <div className="fixed top-0 left-0 flex justify-center items-center h-screen w-screen bg-gray-700 bg-opacity-50 z-50">
      <div className="p-8 bg-gray-700 rounded-xl border-4 border-gray-800 relative">
        <button className="m-2 absolute top-0 right-0">
          <ImCross
            size={15}
            color="#fff"
            opacity={100}
            onClick={handleClose as MouseEventHandler}
          />
        </button>
        <h1 className="text-center text-white text-2xl mb-3">{t("auction")}</h1>
        <Formik
          initialValues={{ price: (10).toFixed(2), time: 1 }}
          validate={({ price, time }) => {
            const errors: any = {};
            if (!price) {
              errors.price = "Required";
            } else if (!time) {
              errors.time = "Required";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setAuctionData({
              price: +values.price * 1000,
              time: values.time,
              set,
              uid,
              type: currency,
              kind,
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
                <div className="flex flex-col sm:flex-row gap-5">
                  <div className="text-white">
                    <FormInput
                      type="number"
                      name="price"
                      errors={errors.price}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      touched={touched.price}
                      value={values.price}
                    />
                  </div>
                  <div className="text-white">
                    <FormInput
                      type="number"
                      name="time"
                      errors={errors.time}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      touched={touched.time}
                      value={values.time}
                    />
                  </div>
                </div>
                {kind === "nft" && (
                  <div className="flex justify-center flex-col items-center">
                    <h1 className="mb-1">Currency</h1>
                    <Select
                      styles={customSelectStyles}
                      defaultValue={selectOptions[0]}
                      onChange={(e) => {
                        setCurrency(e!.value);
                      }}
                      options={selectOptions}
                    />
                    <h1 className="mt-1">
                      fee: {currency === "DLUX" ? "0%" : "1%"}
                    </h1>
                  </div>
                )}
                <button
                  type="submit"
                  className="rounded-lg border border-white py-1 w-2/3 px-2 bg-gray-500 focus:ring-4 mx-auto focus:outline-none focus:ring-gray-700"
                >
                  {t("auction")}
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};
