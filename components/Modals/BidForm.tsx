import React, { useState, useEffect, MouseEventHandler } from "react";

import { Formik } from "formik";
import { FormInput } from "../Utils/FormInput";
import { ImCross } from "react-icons/im";
import {
  broadcastState,
  dlux_ccState,
  prefixState,
  userState,
} from "../../atoms";
import { useRecoilState, useRecoilValue } from "recoil";

import { NFTBid } from "../../utils";
import { ModalWrapper } from "../Utils/ModalWrapper";

export const BidForm: React.FC<{
  set: string;
  uid: string;
  kind: "ft" | "nft";
  type: "HIVE" | "HBD" | "DLUX";
  handleClose: Function;
}> = ({ set, handleClose, uid, kind, type }) => {
  const [_broadcasts, setBroadcasts] = useRecoilState<any>(broadcastState);
  const user: any = useRecoilValue(userState);
  const cc: string = useRecoilValue(dlux_ccState);
  const prefix: string = useRecoilValue(prefixState);
  const [bidData, setBidData] =
    useState<{ set: string; bid_amount: number; uid: string }>();

  useEffect(() => {
    if (bidData && user) {
      NFTBid(user.name, bidData, prefix, kind, type, cc).then(
        (response: any) => {
          if (response) {
            if (response.success) {
              setBroadcasts((prevState: any) => [...prevState, response]);
            }
          }
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bidData, user]);

  return (
    <ModalWrapper handleClose={handleClose}>
      <h1 className="text-center text-white text-2xl mb-3">Bid</h1>
      <Formik
        initialValues={{ bid_amount: (10).toFixed(2) }}
        validate={({ bid_amount }) => {
          const errors: any = {};
          if (!bid_amount) {
            errors.bid_amount = "Required";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setBidData({ bid_amount: +values.bid_amount * 1000, set, uid });
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
                name="bid_amount"
                errors={errors.bid_amount}
                handleBlur={handleBlur}
                handleChange={handleChange}
                touched={touched.bid_amount}
                value={values.bid_amount}
              />
              <button
                type="submit"
                className="rounded-lg border border-white py-1 w-2/3 px-2 bg-gray-500 focus:ring-4 mx-auto focus:outline-none focus:ring-gray-700"
              >
                Bid
              </button>
            </div>
          </form>
        )}
      </Formik>
    </ModalWrapper>
  );
};
