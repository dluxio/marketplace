import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import Ping from "ping.js";
import { useTranslation } from "next-export-i18n";
import { FaWindows, FaApple, FaLinux } from "react-icons/fa";
import { Formik } from "formik";
import Select from "react-select";

import { apiLinkState, userState } from "../atoms";
import { FormInput } from "../components/Utils/FormInput";
import { hiveApi } from "../constants";
import { Client } from "@hiveio/dhive";
import { WitnessSettings } from "../components/Card/WitnessSettings";
import { ISettings, witnessSettings } from "../utils";

type optionEl = {
  value: string;
  label: string;
  pingTime: number;
};
const p = new Ping();

const Settings = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [options, setOptions] = useState<any>();
  const [toShow, setToShow] = useState([]);
  const [apiLink, setApiLink] = useRecoilState(apiLinkState);
  const { t } = useTranslation();
  const user = useRecoilValue<any>(userState);

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

      const witness = options.find(
        (option: { api_url: string; node: string }) => option.node === user.name
      );
      if (witness) setShowSettings(true);

      setToShow(
        newOptions.sort((a: optionEl, b: optionEl) =>
          a.pingTime < b.pingTime ? 1 : -1
        )
      );
    } else {
      setToShow(options);
    }
  }, [options]);

  const handleSubmit = (data: ISettings) => {
    witnessSettings(data, user.name);
  };

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
        {showSettings && <WitnessSettings handleSubmit={handleSubmit} />}
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
