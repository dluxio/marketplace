import { Formik } from 'formik';
import React, { MouseEventHandler, useEffect, useState } from 'react';
import { ImCross } from 'react-icons/im';
import { FormInput } from '../FormInput';

import { useRecoilValue } from 'recoil';
import { userState } from '../../atoms';

import { FTAirdrop } from '../../utils';

export const Airdrop = ({
  handleClose,
  set,
}: {
  handleClose: Function;
  set: string;
}) => {
  const user: any = useRecoilValue(userState);
  const [airdropData, setAirdropData] =
    useState<{ to: string[]; set: string }>();

  useEffect(() => {
    if (airdropData) {
      console.log('AIRDROP: ', airdropData);
      FTAirdrop(user.name, airdropData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [airdropData]);

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
        <h1 className="text-center text-white text-2xl">Airdrop NFT</h1>
        <Formik
          initialValues={{ to: '' }}
          validate={({ to }) => {
            const errors: any = {};
            if (!to) {
              errors.to = 'Required';
            }
            return errors;
          }}
          onSubmit={({ to }, { setSubmitting }) => {
            setAirdropData({ to: to.split(' '), set });
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
                <p>example - &quot;name another_name&quot;</p>
                <button
                  type="submit"
                  className="rounded-lg border border-white py-1 w-2/3 px-2 bg-gray-500 focus:ring-4 mx-auto focus:outline-none focus:ring-gray-700"
                >
                  Airdrop
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};
