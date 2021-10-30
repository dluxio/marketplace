import React, { useState, useEffect } from 'react';

import { Formik } from 'formik';
import { FormInput } from '../components/FormInput';

import { useRecoilValue } from 'recoil';
import { userState, prefixState } from '../atoms';

import { NFTCreate } from '../utils';

const CreateNFT = () => {
  const user: any = useRecoilValue(userState);
  const prefix: string = useRecoilValue(prefixState);
  const [form, setForm] = useState<{
    name: string;
    type: number;
    script: string;
    permlink: string;
    start: string;
    end: string;
    royalty: string;
    handling: string;
    max_fee: number;
    bond: number;
  }>();

  useEffect(() => {
    if (form) {
      NFTCreate(user.name, prefix, form);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);

  return (
    <div className="overflow-hidden">
      <div className="flex flex-grow flex-1 justify-center items-center mt-20">
        {user ? (
          <div className="border border-gray-800 bg-gray-600  text-white w-full sm:w-1/2 text-center rounded-xl">
            <h1 className="text-3xl py-4">Create an NFT</h1>
            <Formik
              initialValues={{
                name: '',
                type: 1 || 2,
                script: '',
                permlink: '',
                start: '',
                end: '',
                royalty: '',
                handling: 'svg',
                max_fee: 1,
                bond: 1,
              }}
              validate={({ name, script, permlink, start, end, royalty }) => {
                const errors: any = {};

                if (!name) {
                  errors.name = 'Required';
                } else if (!script) {
                  errors.script = 'Required';
                } else if (!permlink) {
                  errors.permlink = 'Required';
                } else if (!start) {
                  errors.start = 'Required';
                } else if (!end) {
                  errors.end = 'Required';
                } else if (!royalty) {
                  errors.royalty = 'Required';
                }

                if (errors) return errors;
                return {};
              }}
              onSubmit={(values, { setSubmitting }) => {
                setForm(values);
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
                isSubmitting,
              }) => (
                <form onSubmit={handleSubmit}>
                  <div className="w-full my-6">
                    <div className="flex gap-5 mx-10 my-2">
                      <FormInput
                        name="name"
                        value={values.name}
                        errors={errors.name}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        touched={touched.name}
                      />
                      <FormInput
                        name="permlink"
                        value={values.permlink}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        errors={errors.permlink}
                        touched={touched.permlink}
                      />
                    </div>
                    <div className="mx-10">
                      <FormInput
                        name="script"
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        value={values.script}
                        errors={errors.script}
                        touched={touched.script}
                      />
                    </div>
                    <div className="flex gap-5 mx-10 my-2">
                      <FormInput
                        name="start"
                        value={values.start}
                        errors={errors.start}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        touched={touched.start}
                      />
                      <FormInput
                        name="end"
                        errors={errors.end}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        touched={touched.end}
                        value={values.end}
                      />
                    </div>
                    <div className="flex gap-5 mx-10 my-2">
                      <FormInput
                        name="royalty"
                        value={values.royalty}
                        errors={errors.royalty}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        touched={touched.royalty}
                      />
                      <FormInput
                        name="handling"
                        value={values.handling}
                        errors={errors.handling}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        touched={touched.royalty}
                      />
                    </div>
                    <div className="flex gap-5 mx-10 my-2">
                      <FormInput
                        name="max_fee"
                        type="number"
                        value={values.max_fee}
                        errors={errors.max_fee}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        touched={touched.max_fee}
                      />
                      <FormInput
                        name="bond"
                        type="number"
                        value={values.bond}
                        errors={errors.bond}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        touched={touched.bond}
                      />
                    </div>
                  </div>
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="rounded-lg m-3 border border-white py-2 px-5 bg-gray-500 focus:ring-4 focus:outline-none focus:ring-gray-700"
                  >
                    Submit
                  </button>
                </form>
              )}
            </Formik>
          </div>
        ) : (
          <div>
            <h1 className="text-white text-xl">Log in...</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateNFT;
