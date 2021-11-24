import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { apiLinkState } from "../atoms";
import Ping from "ping.js";
import Select from "react-select";
import { useTranslation } from "next-export-i18n";

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
        <div className="w-full mx-2 sm:w-1/2">
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
      </div>
    </div>
  );
};

export default Settings;
