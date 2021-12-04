import { Formik } from "formik";
import React, { MouseEventHandler, useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { FormInput } from "../FormInput";

import { useRecoilValue, useRecoilState } from "recoil";
import { userState, prefixState, broadcastState } from "../../atoms";

import { Sell } from "../../utils";
import { useTranslation } from "next-export-i18n";

type SellFormProps = {
  handleClose: Function;
  set: string;
  uid?: string;
  availible?: number;
};

export const SellForm = ({
  handleClose,
  set,
  uid,
  availible,
}: SellFormProps) => {
  const [broadcasts, setBroadcasts] = useRecoilState<any>(broadcastState);
  const user: any = useRecoilValue(userState);
  const prefix: string = useRecoilValue(prefixState);
  const { t } = useTranslation();
  const [sellData, setSellData] = useState<{
    price: number;
    set: string;
    uid?: string;
    qty?: number;
  }>();

  useEffect(() => {
    if (sellData) {
      Sell(user.name, sellData, prefix).then((response: any) => {
        if (response) {
          if (response.success) {
            setBroadcasts((prevState: any) => [...prevState, response]);
          }
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sellData]);

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
        <h1 className="text-center text-white text-2xl mb-3">{t("sell")}</h1>
        <Formik
          initialValues={{ price: (10).toFixed(3), qty: 1 }}
          validate={({ price, qty }) => {
            const errors: any = {};
            if (!price) {
              errors.price = "Required";
            }
            if (availible) {
              if (availible < qty) {
                errors.qty = "You don't have enough";
              }
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setSellData({
              price: +values.price * 1000,
              set,
              uid: uid ? uid : undefined,
              qty: values.qty ? values.qty : undefined,
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
                  type="number"
                  name="price"
                  errors={errors.price}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  touched={touched.price}
                  value={values.price}
                />
                {!uid && (
                  <FormInput
                    type="number"
                    name="qty"
                    errors={errors.qty}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    touched={touched.qty}
                    value={values.qty}
                  />
                )}
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
