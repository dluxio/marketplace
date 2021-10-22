import React, { useState, useEffect, MouseEventHandler } from 'react';

import { Formik } from 'formik';
import { FormInput } from '../FormInput';
import { ImCross } from 'react-icons/im';

import { Give, ReserveTrade } from '../../utils';
import { useRecoilValue, useRecoilState } from 'recoil';
import { prefixState, userState, broadcastState } from '../../atoms';

export const TransferNFTFormComp: React.FC<{
  set: string;
  uid?: string;
  handleClose: Function;
}> = ({ set, handleClose, uid }) => {
  const [_broadcasts, setBroadcasts] = useRecoilState<any>(broadcastState);
  const user: any = useRecoilValue(userState);
  const prefix: string = useRecoilValue(prefixState);
  const [transferData, setTransferData] = useState<{
    set: string;
    to: string;
    uid?: string;
    price?: number;
  }>();

  useEffect(() => {
    if (transferData) {
      if (!transferData.price) {
        console.log('Give: ', transferData);
        Give(user.name, transferData, prefix).then((response: any) => {
          if (response) {
            if (response.success) {
              setBroadcasts((prevState: any) => [...prevState, response]);
            }
          }
        });
      } else {
        console.log('Reserve', transferData);
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
        <h1 className="text-center text-white text-2xl">
          Give {uid ? 'NFT' : 'FT'}
        </h1>
        <Formik
          initialValues={{ to: '', price: (0).toFixed(3) }}
          validate={({ to }) => {
            const errors: any = {};
            if (!to) {
              errors.to = 'Required';
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
      </div>
    </div>
  );
};
