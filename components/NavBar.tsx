import React, { useEffect, useState } from "react";

import { useRecoilState, useRecoilValue } from "recoil";
import {
  userState,
  broadcastState,
  refreshState,
  apiLinkState,
} from "../atoms";

import { Login } from "./Login";

import { useRouter } from "next/router";
import { Spinner } from "./Spinner";

import { placeHolder } from "../constants";

import { FaBars } from "react-icons/fa";
import { FcGlobe } from "react-icons/fc";

import Image from "next/image";
import { redoProfilePicture } from "../utils";

import { isMobile } from "react-device-detect";
import axios from "axios";
import {
  useLanguageQuery,
  useTranslation,
  LanguageSwitcher,
} from "next-export-i18n";

export const NavBar = () => {
  const [profDropdown, setProfDropdown] = useState(false);
  const [languageSelect, setLanguageSelect] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [signing, setSigning] = useState(false);
  const [user, setUser] = useRecoilState<any>(userState);
  const [pfpData, setPfp] = useState<any>(placeHolder);
  const router = useRouter();
  const apiLink: string = useRecoilValue(apiLinkState);
  const url = router.pathname.split("/")[1];
  const broadcasts: any = useRecoilValue(broadcastState);
  const refresh: string = useRecoilValue(refreshState);
  const { t } = useTranslation();
  const [query] = useLanguageQuery();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setProfDropdown(false);
  };

  const handleTrades = () => {
    router.push({ pathname: "/trades", query });
    setProfDropdown(false);
  };

  const handleSettings = () => {
    router.push({ pathname: "/settings", query });
    setProfDropdown(false);
  };

  useEffect(() => {
    if (refresh === "pfp" || refresh === "") {
      if (user) {
        setSigning(false);
        setProfDropdown(false);
        axios.get(`${apiLink}api/pfp/${user.name}`).then(({ data }) => {
          setPfp(data.result[0]);
        });
      }
    }
  }, [user, refresh]);

  useEffect(() => {
    if (pfpData) {
      const uid = pfpData.pfp?.split(":");
      const script = pfpData.set?.s;

      if (pfpData.pfp !== placeHolder) {
        if (uid && script) {
          redoProfilePicture({ script, uid });
        }
      }
    }
  }, [pfpData]);

  useEffect(() => {
    const getUser = () => {
      const userStor = localStorage.getItem("user");

      if (userStor) {
        setUser(JSON.parse(userStor));
      }
    };

    if (!user) {
      getUser();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-black text-white px-5 font-normal py-3 pb-2 flex justify-between items-center z-50">
      {!isMobile ? (
        <div className="flex gap-10 flex-grow justify-center items-center">
          <p
            className={`${url === "" && "selected"} navLink`}
            onClick={() => router.push({ pathname: "/", query })}
          >
            {t("home")}
          </p>
          <p
            className={`${
              (url === "inventory" ||
                url === "create-nft" ||
                url === "trades") &&
              "selected"
            } ${user ? "navLink" : "text-gray-600 cursor-not-allowed"}`}
            onClick={() => {
              if (user) {
                router.push({ pathname: "/inventory", query });
              }
            }}
          >
            {t("inventory")}
          </p>
          <p
            className={`${url === "auction" && "selected"} navLink`}
            onClick={() => router.push({ pathname: "/auction", query })}
          >
            {t("auctionHouse")}
          </p>
          <p
            className={`${url === "listings" && "selected"} navLink`}
            onClick={() => router.push({ pathname: "/listings", query })}
          >
            {t("listings")}
          </p>
        </div>
      ) : (
        <div className="flex-grow-0">
          <div className="absolute left-4 top-4">
            <FaBars
              color={"#FFF"}
              size={25}
              onClick={() => setDropdown((prevState) => !prevState)}
            />
          </div>
        </div>
      )}

      {user && (
        <div className="flex gap-7 items-center">
          <FcGlobe
            size={30}
            className="cursor-pointer"
            onClick={() => setLanguageSelect(!languageSelect)}
          />
          <div className="flex items-center gap-5">
            <h1
              className="navLink w-full"
              onClick={() => setProfDropdown((prevState) => !prevState)}
            >
              {user.name}
            </h1>
            <div className="flex items-center w-full ">
              <div
                id="profile-picture"
                className="w-9 cursor-pointer"
                onClick={() => router.push(`/@${user.name}`)}
              >
                <Image height={30} width={30} src={placeHolder} alt="profile" />
              </div>
            </div>
          </div>

          <div
            className={`${
              profDropdown ? "" : "hidden"
            } absolute bg-white top-14 right-2 px-2 pt-2 rounded-xl flex flex-col z-40`}
          >
            <a onClick={handleSettings} className="btn">
              {t("settings")}
            </a>
            <a onClick={handleTrades} className="btn">
              {t("pendingTrades")}
            </a>
            <a className="btn" onClick={handleLogout}>
              {t("logout")}
            </a>
          </div>

          <div
            className={`${
              languageSelect ? "" : "hidden"
            } absolute bg-white top-14 right-32 px-2 pt-2 rounded-xl flex flex-col z-40`}
          >
            <LanguageSwitcher lang="en">
              <a className="btn">English</a>
            </LanguageSwitcher>
            <LanguageSwitcher lang="lt">
              <a className="btn">Lietuvių</a>
            </LanguageSwitcher>
          </div>
        </div>
      )}
      {!user && (
        <div onClick={() => setSigning(true)} className="flex mr-5 navLink">
          <h1>{t("login")}</h1>
        </div>
      )}
      {signing && <Login handleClose={() => setSigning(false)} />}
      {dropdown && (
        <div className="absolute top-14 p-2 bg-white rounded-xl text-center z-50">
          <p
            className={`${
              url === "" && "selected"
            } navLink text-black hover:text-gray-800`}
            onClick={() => router.push("/")}
          >
            {t("home")}
          </p>
          <p
            className={`${
              (url === "inventory" ||
                url === "create-nft" ||
                url === "trades") &&
              "selected"
            } ${
              user
                ? "navLink text-black hover:text-gray-800"
                : "text-gray-600 pb-2 cursor-not-allowed"
            }`}
            onClick={() => {
              if (user) {
                router.push("/inventory");
              }
            }}
          >
            {t("inventory")}
          </p>
          <p
            className={`${
              url === "auction" && "selected"
            } navLink text-black hover:text-gray-800`}
            onClick={() => router.push("/auction")}
          >
            {t("auctionHouse")}
          </p>
          <p
            className={`${
              url === "listings" && "selected"
            } navLink text-black hover:text-gray-800`}
            onClick={() => router.push("/listings")}
          >
            {t("listings")}
          </p>
        </div>
      )}
      <div className={"fixed bottom-5 right-5 grid-cols-1"}>
        {broadcasts.map((broadcast: any) => (
          <Spinner key={broadcast.id} broadcast={broadcast} time={63} />
        ))}
      </div>
    </div>
  );
};
