import { Formik } from 'formik';
import React, { MouseEventHandler, useEffect, useState } from 'react';
import { ImCross } from 'react-icons/im';
import { FormInput } from '../FormInput';

type SellFormProps = {
  handleClose: Function;
  set: string;
  uid: string;
};

export const SellForm = ({ handleClose, set, uid }: SellFormProps) => {
  const [sellData, setSellData] = useState<{
    price: number;
    set: string;
    uid: string;
  }>();

  useEffect(() => {
    if (sellData) {
      console.log(sellData);
    }
  }, [sellData]);

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
        <h1 className="text-center text-white text-2xl mb-3">Sell</h1>
        <Formik
          initialValues={{ price: 1 }}
          validate={({ price }) => {
            const errors: any = {};
            if (!price) {
              errors.price = 'Required';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setSellData({ price: values.price, set, uid });
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
                  Sell
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};
