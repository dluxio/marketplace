import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  apiLinkState,
  broadcastState,
  prefixState,
  userState,
} from "../../atoms";
import { attributeColors } from "../../constants";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { useTranslation } from "next-export-i18n";
import { NFTMelt, SetPFP } from "../../utils";
import { TransferNFTFormComp } from "../../components";
import { Confirmation } from "../../components/Confirmation";
import { AuctionNFTForm } from "../../components/Forms/AuctionForm";
import { SellForm } from "../../components/Forms/SellForm";
import { RoyaltyCard } from "../../components/Forms/RoyaltyCard";

const NFTManagement = () => {
  const [description, setDescription] = useState("");
  const [attributes, setAttributes] = useState<any>();
  const [showActions, setShowActions] = useState(false);
  const [script, setScript] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [selling, setSelling] = useState(false);
  const [isTransfering, setIsTransfering] = useState(false);
  const [auction, setAuction] = useState(false);

  const router = useRouter();
  const { set_uid } = router.query;
  let uid = useMemo(
    () => (set_uid ? (set_uid as string)!.split(":")[1] : ""),
    []
  );
  let set = useMemo(
    () => (set_uid ? (set_uid as string)!.split(":")[0] : ""),
    []
  );
  const apiLink: string = useRecoilValue(apiLinkState);
  const user: any = useRecoilValue(userState);
  const prefix = useRecoilValue(prefixState);
  const [_broadcasts, setBroadcasts] = useRecoilState<any>(broadcastState);
  const { t } = useTranslation();

  useEffect(() => {
    if (set && user) {
      axios.get(`${apiLink}api/set/${set}`).then(({ data }) => {
        setScript(data.set.script);
      });
    } else {
      router.push("/");
    }
  }, []);

  const handleSetPfp = () => {
    SetPFP(user.name, prefix, { set, uid }).then((response: any) => {
      if (response) {
        if (response.success) {
          setBroadcasts((prevState: any) => [...prevState, response]);
        }
      }
    });
  };

  const handleMelt = () => {
    setConfirm(false);
    NFTMelt(user.name, { set, uid }, prefix).then((response: any) => {
      if (response) {
        if (response.success) {
          setBroadcasts((prevState: any) => [...prevState, response]);
        }
      }
    });
  };

  const fetchImage = () => {
    if (uid && set) {
      fetch(`https://ipfs.io/ipfs/${script}?${uid}`)
        .then((response) => response.text())
        .then((data) => {
          const code = `(//${data}\n)("${uid}")`;
          const SVG = eval(code);
          setDescription(SVG.set.Description);
          let attributeObj = {};
          SVG.attributes.forEach((attr: any) => {
            attributeObj = { ...attributeObj, ...attr };
          });
          setAttributes(attributeObj);

          document.getElementById(`${set}-${uid}-details`)!.innerHTML =
            SVG.HTML;
        });
    } else {
      router.push("/");
    }
  };

  useMemo(() => {
    if (script) fetchImage();
  }, [script]);

  return (
    <div className="w-full flex flex-col sm:flex-row justify-between mt-5 mb-2 text-white text-xl">
      <div className="flex sm:w-1/3 mx-10 flex-col gap-4 text-center bg-gray-600 rounded-xl border-2 border-gray-800 ">
        <div id={`${set}-${uid}-details`} className="w-1/2 mx-auto my-5"></div>
        <h1 className="text-white text-xl font-bold my-5">{uid}</h1>
        <p className="text-white text-center mx-20">{description}</p>
        <div className="my-8">
          {attributes &&
            Object.keys(attributes).map((attr: any) => (
              <div className="mx-20 flex my-2 items-center gap-5">
                <h1
                  className={"text-white text-left px-2 py-1 w-auto rounded-xl"}
                  style={{ backgroundColor: attributeColors[attr] }}
                >
                  {attr}
                </h1>
                <h1 className="text-white text-center">{attributes[attr]}</h1>
              </div>
            ))}
        </div>
      </div>
      <div className="flex flex-col my-10 flex-grow items-center">
        <RoyaltyCard set={set} />
        <div className="flex flex-col items-center">
          <button
            onClick={() => setShowActions(!showActions)}
            className="px-4 py-2 h-16 flex items-center gap-3 rounded-lg border-2 text-white bg-transparent border-gray-700 bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-700"
          >
            Actions{" "}
            {showActions ? <AiOutlineCaretUp /> : <AiOutlineCaretDown />}
          </button>
          <div
            className={`${
              showActions ? "" : "hidden"
            } bg-gray-600 rounded-xl p-5 border-2 border-gray-800 my-3 flex gap-2`}
          >
            <button
              onClick={handleSetPfp}
              className="px-4 py-2 rounded-lg border-2 text-green-500 bg-transparent border-green-500 focus:outline-none focus:ring-2 focus:ring-green-700"
            >
              PFP
            </button>
            <button
              onClick={() => setIsTransfering(true)}
              className="px-4 py-2 rounded-lg border-2 text-blue-500 bg-transparent border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-700"
            >
              {t("give")}
            </button>
            <button
              onClick={() => setAuction(true)}
              className="px-4 py-2 rounded-lg border-2 text-yellow-500 bg-transparent border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-700"
            >
              {t("auction")}
            </button>
            <button
              onClick={() => setSelling(true)}
              className="px-4 py-2 rounded-lg border-2 text-red-500 bg-transparent border-red-500 focus:outline-none focus:ring-2 focus:ring-red-700"
            >
              {t("sell")}
            </button>
            <button
              onClick={() => setConfirm(true)}
              className="px-4 py-2 rounded-lg border-2 text-red-600 bg-transparent border-red-600 focus:outline-none focus:ring-2 focus:ring-red-800"
            >
              Melt
            </button>
          </div>
        </div>
      </div>
      {isTransfering && (
        <TransferNFTFormComp
          uid={uid}
          handleClose={() => setIsTransfering(false)}
          set={set}
        />
      )}
      {auction && (
        <AuctionNFTForm
          set={set}
          uid={uid}
          handleClose={() => setAuction(false)}
          kind={"nft"}
        />
      )}
      {selling && (
        <SellForm set={set} uid={uid} handleClose={() => setSelling(false)} />
      )}
      {confirm && (
        <Confirmation
          handleClose={() => setConfirm(false)}
          handleContinue={handleMelt}
        />
      )}
    </div>
  );
};

export default NFTManagement;
