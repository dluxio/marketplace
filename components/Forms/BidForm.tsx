import React, { useState, useEffect, MouseEventHandler } from 'react';

import { Formik } from 'formik';
import { FormInput } from '../FormInput';
import { ImCross } from 'react-icons/im';
import { broadcastState, prefixState, userState } from '../../atoms';
import { useRecoilState, useRecoilValue } from 'recoil';

import { NFTBid } from '../../utils';

export const BidForm: React.FC<{
  set: string;
  uid: string;
  handleClose: Function;
}> = ({ set, handleClose, uid }) => {
  const [_broadcasts, setBroadcasts] = useRecoilState<any>(broadcastState);
  const user: any = useRecoilValue(userState);
  const prefix: string = useRecoilValue(prefixState);
  const [bidData, setBidData] =
    useState<{ set: string; bid_amount: number; uid: string }>();

  useEffect(() => {
    if (bidData && user) {
      NFTBid(user.name, bidData, prefix).then((response: any) => {
        if (response) {
          if (response.success) {
            setBroadcasts((prevState: any) => [...prevState, response]);
          }
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bidData, user]);

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
        <h1 className="text-center text-white text-2xl mb-3">Bid</h1>
        <Formik
          initialValues={{ bid_amount: (10).toFixed(3) }}
          validate={({ bid_amount }) => {
            const errors: any = {};
            if (!bid_amount) {
              errors.bid_amount = 'Required';
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
      </div>
    </div>
  );
};
