import React, { useState, useEffect, MouseEventHandler } from 'react';

import { Formik } from 'formik';
import { FormInput } from '../FormInput';
import { ImCross } from 'react-icons/im';

import { useRecoilValue } from 'recoil';
import { userState } from '../../atoms';

import { NFTAuction } from '../../utils';

export const AuctionNFTForm: React.FC<{
  set: string;
  uid: string;
  handleClose: Function;
}> = ({ set, handleClose, uid }) => {
  const user: any = useRecoilValue(userState);
  const [auctionData, setAuctionData] = useState<any>({});

  useEffect(() => {
    if (auctionData !== {}) {
      NFTAuction(user.name, auctionData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auctionData]);

  return (
    <div className="fixed top-0 left-0 flex justify-center items-center h-screen w-screen bg-gray-700 bg-opacity-50 z-50">
      <button className="m-5 absolute top-0 left-0">
        <ImCross
          size={25}
          color="#fff"
          opacity={100}
          onClick={handleClose as MouseEventHandler}
        />
      </button>
      <div className="p-8 bg-gray-700 rounded-xl border-4 border-gray-800">
        <h1 className="text-center text-white text-2xl mb-3">Auction</h1>
        <Formik
          initialValues={{ price: 1000, time: 1 }}
          validate={({ price, time }) => {
            const errors: any = {};
            if (!price) {
              errors.price = 'Required';
            } else if (!time) {
              errors.time = 'Required';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setAuctionData({
              price: values.price,
              time: values.time,
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
              <div className="flex flex-col justify-center gap-5 text-white">
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
                    <p>Percision: 3, in DLUX</p>
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
                    <p>Integer days</p>
                  </div>
                </div>
                <button
                  type="submit"
                  className="rounded-lg border border-white py-1 w-2/3 px-2 bg-gray-500 focus:ring-4 mx-auto focus:outline-none focus:ring-gray-700"
                >
                  Auction
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};
