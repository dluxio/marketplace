import React, { useEffect, useState } from "react";

import ReactJWPlayer from "react-jw-player";
import hive from "@hiveio/hive-js";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Discussion } from "@hiveio/dhive";
import { RiHeartFill } from "react-icons/ri";
import { MdComment } from "react-icons/md";
import { useRouter } from "next/router";
dayjs.extend(relativeTime);
dayjs().format();

export const NewsPost = ({ post }: { post: Discussion }) => {
  const [playlist, setPlaylist] = useState<any[]>([]);
  const [image, setImage] = useState("");
  const [contentResult, setContentResult] = useState<any>(null);
  const [contentDataObject, setContentData] = useState<any>(null);
  const [speak, set3speak] = useState(false);
  const router = useRouter();

  useEffect(() => {
    hive.api.getContent(post.author, post.permlink, (err: any, result: any) => {
      if (err) console.log(err);
      console.log(result);
      setContentResult(result);
    });
  }, []);

  useEffect(() => {
    if (contentResult) {
      const contentData = JSON.parse(contentResult.json_metadata);
      setContentData(contentData);
    }
  }, [contentResult]);

  useEffect(() => {
    const contentData = contentDataObject;
    console.log(contentDataObject);

    if (contentData) {
      if (contentData.app.includes("3speak")) {
        set3speak(true);
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
        let imagestring;

        if (contentData.image && Array.isArray(contentData.image)) {
          imagestring = contentData.image[0];
        } else if (typeof contentData.image == "string") {
          imagestring = contentData.image;
        } else if (contentData.Hash360 && typeof contentData.Hash360) {
          imagestring = `https://ipfs.io/ipfs/${contentData.Hash360}`;
        } else {
          imagestring = "https://www.dlux.io/img/dlux-sdk.png";
        }

        if (imagestring) {
          if (imagestring.substr(0, 5) !== "https") {
            imagestring = "https://www.dlux.io/img/dlux-sdk.png";
          }
        }

        setImage(imagestring);
      }
    }
  }, [contentDataObject]);

  return (
    contentDataObject && (
      <div className="relative border-2 text-white py-1 sm:p-3 rounded-xl h-full border-gray-800 bg-gray-600 w-full flex flex-col items-center justify-center">
        {speak ? (
          <div className="w-full flex justify-center">
            <ReactJWPlayer
              className="rounded-xl w-4/5"
              playerId="my-unique-id"
              playerScript="https://cdn.jwplayer.com/libraries/HT7Dts3H.js"
              playlist={playlist}
            />
          </div>
        ) : (
          <div className="flex justify-center w-full">
            <img src={image} className="w-4/5" alt="appPhoto" />
          </div>
        )}
        <h1 className="text-center text-xl my-2 max-w-md font-bold">
          {contentResult.root_title}
        </h1>
        <div className="flex justify-between w-full">
          <div className="flex items-center gap-1">
            <RiHeartFill />
            <h1>({contentResult.active_votes.length})</h1>
          </div>
          <div
            onClick={() =>
              router.push(`/@${contentResult.author}/${contentResult.permlink}`)
            }
            className="flex items-center gap-1 cursor-pointer hover:text-gray-300"
          >
            <MdComment />
            <h1>Comment</h1>
          </div>
        </div>
      </div>
    )
  );
};
