import React from "react";
import { Formik } from "formik";
import { BiPaperPlane } from "react-icons/bi";

import { FormInput } from "../Utils/FormInput";
import { ModalWrapper } from "../Utils/ModalWrapper";
import { gov, sendDLUX } from "../../utils";
import { useRecoilState, useRecoilValue } from "recoil";
import { broadcastState, userState } from "../../atoms";
import { FaLock, FaUnlock } from "react-icons/fa";

export const GovModal = ({
  handleClose,
  balance,
  up = true,
}: {
  handleClose: any;
  balance: number;
  up?: boolean;
}) => {
  const user = useRecoilValue<any>(userState);
  const [_broadcasts, setBroadcasts] = useRecoilState<any>(broadcastState);

  return (
    <ModalWrapper handleClose={handleClose}>
      <h1 className="text-xl mb-2">
        {up ? "Lock DLUX for Governance Ops" : "Unlock Governance Tokens"}
      </h1>
      <Formik
        initialValues={{ amount: 1 }}
        onSubmit={({ amount }, { setSubmitting }) => {
          if (user) {
            gov(amount, user.name, up).then((response: any) => {
              if (response) {
                if (response.success) {
                  setBroadcasts((prevState: any) => [...prevState, response]);
                }
              }
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
            <div className="mt-2 relative">
              <FormInput
                title={`Amount (${balance.toFixed(2)} GOV)`}
                min={1}
                name="amount"
                type="number"
                errors={errors.amount}
                handleBlur={handleBlur}
                handleChange={handleChange}
                touched={touched.amount}
                value={values.amount}
              />
              <div className="absolute top-8 right-9">
                <img
                  src="https://www.dlux.io/img/dlux-hive-logo-alpha.svg"
                  width={25}
                  height={25}
                  alt="logo"
                />
              </div>
            </div>
            <button
              type="submit"
              className="px-2 py-1 mx-auto mt-5 flex items-center gap-3 rounded-lg border-2 text-white bg-gradient-to-b from-pink-500 to-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              {up ? (
                <h1 className="flex gap-4 items-center">
                  Lock GOV <FaLock />
                </h1>
              ) : (
                <h1 className="flex gap-4 items-center">
                  Unlock GOV <FaUnlock />
                </h1>
              )}
            </button>
          </form>
        )}
      </Formik>
    </ModalWrapper>
  );
};
