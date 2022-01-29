import React, { useState, useEffect } from "react";

import { Formik } from "formik";
import { FormInput } from "../Utils/FormInput";

import { Give, ReserveTrade } from "../../utils";
import { useRecoilValue, useRecoilState } from "recoil";
import { prefixState, userState, broadcastState } from "../../atoms";
import { useTranslation } from "next-export-i18n";
import { ModalWrapper } from "../Utils/ModalWrapper";

export const TransferNFTFormComp: React.FC<{
  set: string;
  uid?: string;
  handleClose: Function;
}> = ({ set, handleClose, uid }) => {
  const [_broadcasts, setBroadcasts] = useRecoilState<any>(broadcastState);
  const user: any = useRecoilValue(userState);
  const prefix: string = useRecoilValue(prefixState);
  const { t } = useTranslation();
  const [transferData, setTransferData] = useState<{
    set: string;
    to: string;
    uid?: string;
    price?: number;
  }>();

  useEffect(() => {
    if (transferData) {
      if (!transferData.price) {
        Give(user.name, transferData, prefix).then((response: any) => {
          if (response) {
            if (response.success) {
              setBroadcasts((prevState: any) => [...prevState, response]);
            }
          }
        });
      } else {
        ReserveTrade(user.name, prefix, transferData).then((response: any) => {
          if (response) {
            if (response.success) {
              setBroadcasts((prevState: any) => [...prevState, response]);
            }
          }
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transferData, user]);

  return (
    <ModalWrapper handleClose={handleClose}>
      <h1 className="text-center text-white text-2xl">
        {t("give")} {uid ? "NFT" : "FT"}
      </h1>
      <Formik
        initialValues={{ to: "", price: (0).toFixed(2) }}
        validate={({ to }) => {
          const errors: any = {};
          if (!to) {
            errors.to = "Required";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          if (+values.price * 1000 === 0) {
            setTransferData({
              to: values.to,
              set,
              uid: uid && uid,
            });
          } else {
            setTransferData({
              to: values.to,
              set,
              uid: uid && uid,
              price: +values.price * 1000,
            });
          }
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
                name="to"
                errors={errors.to}
                handleBlur={handleBlur}
                handleChange={handleChange}
                touched={touched.to}
                value={values.to}
              />
              <FormInput
                type="number"
                name="price"
                errors={errors.price}
                handleBlur={handleBlur}
                handleChange={handleChange}
                touched={touched.price}
                value={values.price}
              />
              <button
                type="submit"
                className="rounded-lg border border-white py-1 w-2/3 px-2 bg-gray-500 focus:ring-4 mx-auto focus:outline-none focus:ring-gray-700"
              >
                Transfer
              </button>
            </div>
          </form>
        )}
      </Formik>
    </ModalWrapper>
  );
};
