import React, { useState, useEffect, MouseEventHandler } from "react";

import { Formik } from "formik";
import { FormInput } from "../Utils/FormInput";
import { ImCross } from "react-icons/im";
import { ReserveTrade } from "../../utils";
import { useRecoilState, useRecoilValue } from "recoil";
import { broadcastState, prefixState, userState } from "../../atoms";
import { ModalWrapper } from "../Utils/ModalWrapper";

export const ReserveNFTForm: React.FC<{
  set: string;
  uid: string;
  handleClose: Function;
}> = ({ set, handleClose, uid }) => {
  const user: any = useRecoilValue(userState);
  const prefix: string = useRecoilValue(prefixState);
  const [_broadcasts, setBroadcasts] = useRecoilState<any>(broadcastState);
  const [reserveData, setReserveData] = useState<{
    set: string;
    uid: string;
    to: string;
    price: number;
  }>();

  useEffect(() => {
    if (reserveData) {
      ReserveTrade(user.name, prefix, reserveData).then((response: any) => {
        response && setBroadcasts((prevState: any) => [...prevState, response]);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reserveData]);

  return (
    <ModalWrapper handleClose={handleClose}>
      <h1 className="text-center text-white text-2xl mb-3">Reserve transfer</h1>
      <Formik
        initialValues={{ price: (10).toFixed(2), to: "" }}
        validate={({ price, to }) => {
          const errors: any = {};
          if (!price) {
            errors.price = "Required";
          } else if (!to) {
            errors.to = "Required";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setReserveData({
            price: +values.price * 1000,
            to: values.to,
            set,
            uid,
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
            <div className="flex flex-col justify-center gap-5 text-white text-center">
              <FormInput
                name="to"
                errors={errors.to}
                handleBlur={handleBlur}
                handleChange={handleChange}
                touched={touched.to}
                value={values.to}
              />
              <div className="flex gap-5">
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
              </div>

              <button
                type="submit"
                className="rounded-lg border border-white py-1 w-2/3 px-2 bg-gray-500 focus:ring-4 mx-auto focus:outline-none focus:ring-gray-700"
              >
                Reserve
              </button>
            </div>
          </form>
        )}
      </Formik>
    </ModalWrapper>
  );
};
