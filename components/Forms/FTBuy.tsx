import React, { MouseEventHandler, useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { useRecoilState, useRecoilValue } from "recoil";
import { broadcastState, prefixState, userState } from "../../atoms";
import { NFTBuy } from "../../utils";
import { FormInput } from "../FormInput";
import { Formik } from "formik";
import { useTranslation } from "next-export-i18n";

type FTBuyProps = {
  ft: {
    set: string;
    script: string;
    price: { precision: number; amount: number };
    by: string;
    uid: string;
    qty: number;
  };
  handleClose: Function;
};

export const FTBuy = ({ ft, handleClose }: FTBuyProps) => {
  const [buyData, setBuyData] = useState<any>();
  const [_broadcasts, setBroadcasts] = useRecoilState<any>(broadcastState);
  const user: any = useRecoilValue(userState);
  const prefix: string = useRecoilValue(prefixState);
  const { t } = useTranslation();

  const handleBuy = async () => {
    const response: any = await NFTBuy(user.name, buyData, prefix);
    if (response) {
      if (response.success) {
        setBroadcasts((prevState: any) => [...prevState, response]);
      }
    }
  };

  useEffect(() => {
    if (buyData) {
      handleBuy();
    }
  }, [buyData]);

  return (
    <div className="fixed  top-0 left-0 flex justify-center items-center h-screen w-screen bg-gray-700 bg-opacity-50 z-50">
      <div className=" p-8 bg-gray-700 rounded-xl border-4 border-gray-800 relative">
        <button className="m-2 absolute top-0 right-0">
          <ImCross
            size={15}
            color="#fff"
            opacity={100}
            onClick={handleClose as MouseEventHandler}
          />
        </button>
        <h1 className="text-xl text-center whitespace-nowrap mb-2">
          How many?
        </h1>
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
            console.log(qty, ft);
            setBuyData({
              price: +ft.price.amount * 1000 * qty,
              set: ft.set,
              uid: ft.uid ? ft.uid : undefined,
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
                />

                <button
                  type="submit"
                  className="rounded-lg border border-white py-1 w-2/3 px-2 bg-gray-500 focus:ring-4 mx-auto focus:outline-none focus:ring-gray-700"
                >
                  {t("sell")}
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};
