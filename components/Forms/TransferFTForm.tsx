import React, { useState, useEffect, MouseEventHandler } from 'react';

import { Formik } from 'formik';
import { FormInput } from '../FormInput';
import { ImCross } from 'react-icons/im';

export const TransferFTFormComp: React.FC<{
  set: string;
  handleClose: MouseEventHandler;
}> = ({ set, handleClose }) => {
  const [transferData, setTransferData] = useState({ set: '', to: '' });

  useEffect(() => console.log(transferData), [transferData]);

  return (
    <div className="fixed top-0 left-0 flex justify-center items-center h-full w-full bg-gray-700 bg-opacity-50 z-50">
      <button className="m-5 absolute top-0 left-0">
        <ImCross size={25} color="#fff" opacity={100} onClick={handleClose} />
      </button>
      <div className="p-8 bg-gray-700 rounded-xl border-4 border-gray-800">
        <h1 className="text-center text-2xl">Transfer FT</h1>
        <Formik
          initialValues={{ to: '' }}
          validate={({ to }) => {
            const errors: any = {};
            if (!to) {
              errors.to = 'Required';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTransferData({ to: values.to, set });
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
              <div className="flex flex-col justify-center gap-3">
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
                  className="rounded-lg border border-white py-2 px-5 bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-700"
                >
                  Transfer {set} FT
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};
