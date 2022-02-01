import { Formik } from "formik";
import React from "react";
import { ISettings } from "../../utils";
import { FormInput } from "../Utils/FormInput";

export const WitnessSettings = ({
  handleSubmit,
}: {
  handleSubmit: (data: ISettings) => any;
}) => {
  return (
    <div className="w-full mx-2 my-4">
      <h1 className="text-2xl">Witness settings</h1>
      <Formik
        initialValues={{
          escrow: true,
          mirror: false,
          bidRate: 20,
          marketingRate: 20,
          domain: "",
          pubKey: "",
          prevKey: "",
        }}
        validate={({ domain, pubKey, prevKey }) => {
          const errors: any = {};

          if (!domain) {
            errors.domain = "Required!";
          }
          if (!pubKey) {
            errors.pubKey = "Required!";
          }
          if (!prevKey) {
            errors.prevKey = "Required!";
          }

          return errors;
        }}
        onSubmit={(data, { setSubmitting }) => {
          handleSubmit({
            ...data,
            prevKey: data.prevKey.trim(),
            pubKey: data.pubKey.trim(),
          });
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
          <div className="w-full sm:w-2/3 bg-gray-600 px-7 py-3 text-base rounded-xl border-2 border-gray-700">
            <form onSubmit={handleSubmit}>
              <FormInput
                name="domain"
                sideTitle="https://"
                errors={errors.domain}
                handleBlur={handleBlur}
                handleChange={handleChange}
                touched={touched.domain}
                value={values.domain}
              />
              <div className="flex gap-2 items-end mt-3">
                <div className="relative">
                  <h1 className="absolute top-8 right-8">%</h1>
                  <FormInput
                    name="bidRate"
                    title="Node Inflation Vote"
                    type="number"
                    min={1}
                    errors={errors.bidRate}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    touched={touched.bidRate}
                    value={values.bidRate}
                  />
                </div>
                <div className="relative">
                  <h1 className="absolute top-8 right-8">%</h1>
                  <FormInput
                    name="marketingRate"
                    min={1}
                    title="DAO Inflation Vote"
                    type="number"
                    errors={errors.marketingRate}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    touched={touched.marketingRate}
                    value={values.marketingRate}
                  />
                </div>
                <div className="flex flex-col align-center justify-center">
                  <div className="flex items-center align-center gap-2">
                    <input
                      name="escrow"
                      title="Escrow agent"
                      type="checkbox"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.escrow ? 1 : 0}
                    />
                    <h1>Escrow agent</h1>
                  </div>
                  <div className="flex items-center align-center gap-2">
                    <input
                      name="mirror"
                      type="checkbox"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.mirror ? 1 : 0}
                    />
                    <h1>Mirror Leader</h1>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <FormInput
                  name="pubKey"
                  title="DLUX MS Witness Pub Key"
                  errors={errors.pubKey}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  touched={touched.pubKey}
                  value={values.pubKey}
                />
                <FormInput
                  name="prevKey"
                  title="DLUX MS Witness Private Key"
                  errors={errors.prevKey}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  touched={touched.prevKey}
                  value={values.prevKey}
                />
              </div>
              <button
                type="submit"
                className={`px-2 py-1 mx-auto mt-5 flex items-center gap-3 rounded-lg border-2 text-white bg-gradient-to-b from-pink-500 to-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600`}
              >
                Submit
              </button>
            </form>
          </div>
        )}
      </Formik>
    </div>
  );
};
