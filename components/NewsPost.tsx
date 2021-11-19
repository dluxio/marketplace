import React, { useEffect, useState } from "react";

import ReactJWPlayer from "react-jw-player";
import hive from "@hiveio/hive-js";
import { useRecoilValue } from "recoil";
import { ipfsLinkState } from "../atoms";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
dayjs().format();

export const NewsPost = () => {
  const [playlist, setPlaylist] = useState<any[]>([]);
  const [image, setImage] = useState("");
  const [contentResult, setContentResult] = useState<any>(null);

  useEffect(() => {
    hive.api.getContent("daltono", "fuxxgjcr", (err: any, result: any) => {
      if (err) console.log(err);
      console.log(result);
      setContentResult(result);
    });
  }, []);

  useEffect(() => {
    if (contentResult) {
      const contentData = JSON.parse(contentResult.json_metadata);
      console.log(contentData);

      if (contentData.app.includes("3speak")) {
        const file: string =
          `https://ipfs.io/ipfs/` + contentData.video.info.ipfs;
        const image: string =
          `https://ipfs.io/ipfs/` + contentData.video.info.ipfsThumbnail;

        if (image && file) {
          setPlaylist((prevState) => [
            ...prevState,
            {
              file,
              image,
            },
          ]);
        }
      } else {
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
          if (imagestring.substr(0, 5) !== "https") {
            imagestring = "https://www.dlux.io/img/dlux-sdk.png";
          }
          setImage(imagestring);
        };

        fetchImage(contentData);
      }
    }
  }, [contentResult]);

  return (
    contentResult && (
      <div className="border-2 text-white p-3 rounded-xl border-gray-800 bg-gray-600">
        {playlist !== [] ? (
          <ReactJWPlayer
            className="rounded-xl"
            playerId="my-unique-id"
            playerScript="https://cdn.jwplayer.com/libraries/HT7Dts3H.js"
            playlist={playlist}
          />
        ) : (
          <div className="flex justify-center">
            {image && (
              <img src={image} className="w-full h-60" alt="appPhoto" />
            )}
          </div>
        )}
        <h1 className="text-center text-sm my-2">{contentResult.root_title}</h1>
        <h1 className="text-right text-sm my-1 text-gray-200">
          {dayjs().fromNow(contentResult.created)}
        </h1>
      </div>
    )
  );
};
