import { Formik } from 'formik';
import React, { MouseEventHandler, useEffect, useState } from 'react';
import { ImCross } from 'react-icons/im';
import { FormInput } from '../FormInput';

export const Airdrop = ({
  handleClose,
  set,
}: {
  handleClose: MouseEventHandler;
  set: string;
}) => {
  const [airdropData, setAirdropData] = useState<{ to: string[]; set: string }>(
    { to: [], set: '' }
  );

  useEffect(() => {
    console.log(airdropData);
  }, [airdropData]);

  return (
    <div className="fixed top-0 left-0 flex justify-center items-center h-full w-full bg-gray-700 bg-opacity-50 z-50">
      <button className="m-5 absolute top-0 left-0">
        <ImCross size={25} color="#fff" opacity={100} onClick={handleClose} />
      </button>
      <div className="p-8 bg-gray-700 rounded-xl border-4 border-gray-800">
        <h1 className="text-center text-white text-2xl">Transfer NFT</h1>
        <Formik
          initialValues={{ to: '' }}
          validate={({ to }: { to: string }) => {
            const errors: any = {};
            if (!to) {
              errors.to = 'Required';
            }
            return errors;
          }}
          onSubmit={({ to }, { setSubmitting }) => {
            setAirdropData({ to: to.split(' '), set });
            setSubmitting(false);
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
