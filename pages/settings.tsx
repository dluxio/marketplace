import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import Ping from "ping.js";
import { useTranslation } from "next-export-i18n";
import { FaWindows, FaApple, FaLinux } from "react-icons/fa";
import { Formik } from "formik";
import Select from "react-select";

import { apiLinkState } from "../atoms";
import { FormInput } from "../components/Utils/FormInput";

type optionEl = {
  value: string;
  label: string;
  pingTime: number;
};

const p = new Ping();
const Settings = () => {
  const [options, setOptions] = useState<any>();
  const [toShow, setToShow] = useState([]);
  const [apiLink, setApiLink] = useRecoilState(apiLinkState);
  const { t } = useTranslation();

  useEffect(() => {
    setToShow([]);
    axios.get(`${apiLink}api/mirrors`).then(({ data }) => {
      const optionsToPush: any = [];

      data.apis.forEach((api: any) => {
        if (api.api_url.includes(api.node)) {
          optionsToPush.push(api);
        }
      });

      setOptions(optionsToPush);
    });
  }, []);

  useEffect(() => {
    const newOptions: any = [];
    if (options) {
      options.forEach((api: any) => {
        p.ping(api.api_url).catch((pingTime: any) => {
          newOptions.push({
            value: api.api_url,
            label: `${pingTime}ms | ${api.node} | ${api.api_url}`,
            pingTime,
          });
        });
      });

      setToShow(
        newOptions.sort((a: optionEl, b: optionEl) =>
          a.pingTime < b.pingTime ? 1 : -1
        )
      );
    } else {
      setToShow(options);
    }
  }, [options]);

  return (
    <div className="text-white text-3xl">
      <div className="mx-10 my-10">
        <h1 className="my-5">{t("settings")}</h1>
        <div className="w-full my-10 mx-2 sm:w-1/2">
          <h1 className="text-2xl">{t("APIlink")}</h1>
          <Select
            className="my-1 text-sm h-3 text-black"
            placeholder={t("select")}
            options={toShow}
            onChange={(e: any) => {
              setApiLink(e.value);
            }}
          />
        </div>
        <div className="w-full mx-2 my-4">
          <h1 className="text-2xl">Witness settings</h1>
          <Formik
            initialValues={{
              escrow: true,
              mirror: false,
              inflation: 20,
              DAO: 20,
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
              console.log(data);
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
              <div className="w-1/2 bg-gray-600 px-7 py-3 text-base rounded-xl border-2 border-gray-700">
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
                        name="inflation"
                        title="Node Inflation Vote"
                        type="number"
                        min={1}
                        errors={errors.inflation}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        touched={touched.inflation}
                        value={values.inflation}
                      />
                    </div>
                    <div className="relative">
                      <h1 className="absolute top-8 right-8">%</h1>
                      <FormInput
                        name="DAO"
                        min={1}
                        title="DAO Inflation Vote"
                        type="number"
                        errors={errors.DAO}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        touched={touched.DAO}
                        value={values.DAO}
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
        <div className="w-full mx-2 sm:w-1/2">
          <h1 className="text-2xl mb-3">{t("desktopApp")}</h1>
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="transition text-xl px-4 py-2 rounded-lg border-2 text-white bg-gradient-to-r from-green-400 to-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-700">
              <div className="flex gap-2 items-center">
                <FaWindows />
                Windows
              </div>
            </button>
            <button className="text-xl px-4 py-2 rounded-lg border-2 text-white bg-gradient-to-r from-red-500 to-pink-400 focus:outline-none focus:ring-2 focus:ring-red-700">
              <div className="flex gap-2 items-center">
                <FaApple />
                MacOS
              </div>
            </button>
            <button className="text-xl px-4 py-2 rounded-lg border-2 text-white bg-gradient-to-r from-purple-400 to-pink-500 focus:outline-none focus:ring-2 focus:ring-purple-700">
              <div className="flex gap-2 items-center">
                <FaLinux />
                Linux
              </div>
            </button>
          </div>
          <h1 className="text-sm my-2 text-red-400">
            WARNING! The desktop app is not ready for release yet...
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Settings;
