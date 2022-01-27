import React, { useEffect, useState } from "react";
import hive from "@hiveio/hive-js";
import router from "next/router";
import { Client } from "@hiveio/dhive";
import { FaPlay } from "react-icons/fa";
import { RiUser3Fill, RiHeartFill } from "react-icons/ri";

import { ceramicApi, hiveApi, placeHolder } from "../../constants";
import { useHiveKeychainCeramic } from "spk-auth-react";

type AppCardProps = {
  app: any;
};

export const AppCard = ({ app }: AppCardProps) => {
  const [image, setImage] = useState<any>("");
  const [contentResult, setContentResult] = useState<any>(null);
  const [profilePicture, setProfilePicture] = useState(placeHolder);
  const client = new Client(hiveApi);
  const connector = useHiveKeychainCeramic(ceramicApi);

  useEffect(() => {
    const getCeramicProfile = async (didId: string) => {
      const response = await connector.idx.get("basicProfile", didId);
      return response;
    };

    const fetchImage = (json: any) => {
      let imagestring;

      if (json.image && Array.isArray(json.image)) {
        imagestring = json.image[0];
      } else if (typeof json.image == "string") {
        imagestring = json.image;
      } else if (json.Hash360 && typeof json.Hash360) {
        imagestring = `https://ipfs.io/ipfs/${json.Hash360}`;
      } else {
        imagestring = "https://www.dlux.io/img/dlux-sdk.png";
      }
      if (imagestring?.substring(0, 5) !== "https") {
        imagestring = "https://www.dlux.io/img/dlux-sdk.png";
      }
      setImage(imagestring);
    };

    const { author, permlink } = app;
    hive.api.getContent(author, permlink, (err: any, result: any) => {
      if (err) console.log(err);
      setContentResult(result);
      if (result?.json_metadata) {
        fetchImage(JSON.parse(result.json_metadata));
      }
    });

    if (author.substring(0, 3) === "did") {
      getCeramicProfile(author).then((profile: any) => {
        setProfilePicture(
          "https://ipfs-3speak.b-cdn.net/ipfs/" +
            profile.image.original.src.split("ipfs://")[1] || placeHolder
        );
      });
    } else {
      client.database.getAccounts([author]).then((response: any) => {
        if (response[0]) {
          setProfilePicture(
            JSON.parse(response[0].posting_json_metadata).profile
              .profile_image || placeHolder
          );
        }
      });
    }
  }, []);

  return (
    <div className="border-2 my-3 border-gray-800 rounded-xl w-full bg-gray-600">
      <div className="rounded-t-xl">
        {image && (
          <img src={image} className="w-full rounded-t-xl" alt="appPhoto" />
        )}
      </div>
      <div className="ml-3 my-4 flex gap-2 items-center">
        <img
          src={profilePicture}
          className="rounded-full"
          height={30}
          width={30}
          alt="profile_picture"
        />
        <h1
          className={`text-left text-xl ${
            app.paid
              ? app.promote > 0
                ? "text-yellow-500"
                : "text-blue-500"
              : "text-gray-300"
          }`}
        >
          {contentResult?.title}
        </h1>
      </div>
      <div className="flex flex-col items-baseline">
        <div className="ml-3">
          <div className="flex items-center gap-2 text-xl text-white">
            <RiUser3Fill />
            <h1
              className="hover:text-gray-300 cursor-pointer"
              onClick={() => router.push(`/@${app.author}`)}
            >
              {app.author}
            </h1>
          </div>
          <div className="flex items-center gap-2 text-xl text-white">
            <RiHeartFill color="red" />
            <h1>{app.votes}</h1>
          </div>
        </div>
        <div className="w-full mx-auto my-2 flex justify-center">
          <button
            onClick={() => router.push(`/@${app.author}/${app.permlink}`)}
            className={`${
              app.paid
                ? app.promote > 0
                  ? "bg-yellow-500"
                  : "bg-blue-500"
                : "bg-gray-500"
            } px-7 py-2 rounded-lg flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-yellow-700 text-white`}
          >
            Run
            <FaPlay />
          </button>
        </div>
      </div>
    </div>
  );
};
