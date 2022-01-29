import { Formik } from "formik";
import React, { MouseEventHandler, useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { FormInput } from "../Utils/FormInput";

import { useRecoilValue, useRecoilState } from "recoil";
import { userState, prefixState, broadcastState } from "../../atoms";

import { Sell } from "../../utils";
import { useTranslation } from "next-export-i18n";
import { ModalWrapper } from "../Utils/ModalWrapper";

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
    <ModalWrapper handleClose={handleClose}>
      <h1 className="text-center text-white text-2xl mb-3">{t("sell")}</h1>
      <Formik
        initialValues={{ price: (10).toFixed(2), qty: 1 }}
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
    </ModalWrapper>
  );
};
