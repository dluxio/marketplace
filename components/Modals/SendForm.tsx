import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Formik } from "formik";
import { BiPaperPlane } from "react-icons/bi";

import { ModalWrapper } from "../Utils/ModalWrapper";
import { FormInput } from "../Utils/FormInput";
import { sendDLUX } from "../../utils";
import { broadcastState, userState } from "../../atoms";

export const Send = ({
  handleClose,
  balance,
  currency,
}: {
  handleClose: any;
  balance: number;
  currency: string;
}) => {
  const user = useRecoilValue<any>(userState);
  const [_broadcasts, setBroadcasts] = useRecoilState<any>(broadcastState);

  return (
    <ModalWrapper handleClose={handleClose}>
      <h1 className="text-xl mb-2">Send {currency}</h1>
      <Formik
        initialValues={{ to: "", amount: 1, memo: "" }}
        validate={({ to, amount }) => {
          const errors: { to?: string; amount?: string } = {};
          if (!to) {
            errors.to = "Required";
          }
          if (amount > balance) {
            errors.amount = `Not enough ${currency}`;
          }
          return errors;
        }}
        onSubmit={(data, { setSubmitting }) => {
          if (user) {
            sendDLUX(data, user.name).then((response: any) => {
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
            <FormInput
              name="to"
              errors={errors.to}
              handleBlur={handleBlur}
              handleChange={handleChange}
              touched={touched.to}
              value={values.to}
            />
            <div className="mt-2 relative">
              <FormInput
                min={1}
                title={`Amount (${balance.toFixed(2)} ${currency})`}
                name="amount"
                type="number"
                errors={errors.amount}
                handleBlur={handleBlur}
                handleChange={handleChange}
                touched={touched.amount}
                value={values.amount}
              />
              <div className={`absolute top-8 right-9`}>
                <img
                  src={
                    currency === "DLUX"
                      ? "https://www.dlux.io/img/dlux-hive-logo-alpha.svg"
                      : "https://www.dlux.io/img/hextacular.svg"
                  }
                  width={25}
                  height={25}
                  alt="logo"
                />
              </div>
            </div>
            <div className="mt-2">
              <FormInput
                name="memo"
                errors={errors.memo}
                handleBlur={handleBlur}
                handleChange={handleChange}
                touched={touched.memo}
                value={values.memo}
              />
            </div>
            <button
              type="submit"
              className={`px-2 py-1 mx-auto mt-5 flex items-center gap-3 rounded-lg border-2 text-white bg-gradient-to-b ${
                currency === "DLUX"
                  ? "from-pink-500 to-blue-500"
                  : "from-white to-red-500"
              } focus:outline-none focus:ring-2 focus:ring-blue-600`}
            >
              Send
              <BiPaperPlane size="1.5rem" />
            </button>
          </form>
        )}
      </Formik>
    </ModalWrapper>
  );
};
