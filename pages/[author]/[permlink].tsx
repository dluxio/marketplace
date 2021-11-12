import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
import hive from "@hiveio/hive-js";
import { vote } from "../../utils";
import { useRecoilState, useRecoilValue } from "recoil";
import { broadcastState, userState } from "../../atoms";

const AppDetails = () => {
  const [voteWeight, setVoteWeight] = useState(0);
  const [image, setImage] = useState("");
  const [showApp, setShowApp] = useState(true);
  const [username, setUsername] = useState("");
  const [broadcasts, setBroadcasts] = useRecoilState<any>(broadcastState);
  const [contentResult, setContentResult] = useState<any>(null);
  const router = useRouter();
  const user: any = useRecoilValue(userState);
  const { permlink, author } = router.query;

  const handleRunApp = () => {
    document.title = `DLUX | ${contentResult.title}`;
    var metadata = contentResult.json_metadata;
    var hashy = JSON.parse(metadata).vrHash;
    var scrolling = JSON.parse(metadata).scrolling;
    var vars = location.href.split("?")[1];
    var iframe = document.createElement("iframe");
    iframe.id = "theIframe";
    iframe.setAttribute("scrolling", scrolling || "yes");
    iframe.width = "100%";
    iframe.height = "100%";
    iframe.setAttribute("allowfullscreen", "true");
    iframe.setAttribute(
      "allow",
      "gyroscope; accelerometer; microphone; camera"
    );
    iframe.src = `https://anywhere.ipfs.dlux.io/ipfs/${hashy}?${vars}`;
    if (document.getElementById("iframe-app")) {
      document.getElementById("iframe-app")!.appendChild(iframe);
    }
  };

  const handleVote = () => {
    vote(user.name, username, permlink as string, voteWeight).then(
      (response: any) => {
        if (response) {
          if (response.success) {
            setBroadcasts((prevState: any) => [...prevState, response]);
          }
        }
      }
    );
  };

  useEffect(() => {
    if (!author) router.push("/");
    if (author && (author! as string).substr(0, 1) === "@") {
      setUsername((author! as string).substr(1, author!.length));
    }
  }, []);

  useEffect(() => {
    if (contentResult) {
      handleRunApp();
    }
  }, [contentResult]);

  useEffect(() => {
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

    if (username !== "") {
      hive.api.getContent(username, permlink, (err: any, result: any) => {
        if (err) console.log(err);
        console.log(result);
        fetchImage(JSON.parse(result.json_metadata));
        setContentResult(result);
      });
    }
  }, [username]);

  return showApp ? (
    <div className="w-full h-screen fixed top-0 left-0 bg-black text-white text-2xl font-bold bg-opacity-70">
      <div className="flex px-10 justify-between w-full bg-blue-500">
        <span
          className="hover:text-gray-500 cursor-pointer"
          onClick={() => {
            document
              .querySelectorAll("iframe")
              .forEach((iframe) => iframe.remove());
            setShowApp(false);
          }}
        >
          DLUX
        </span>
        <span>{contentResult?.title}</span>
      </div>
      <div className="w-full h-full" id="iframe-app"></div>
    </div>
  ) : (
    <div className="flex justify-evenly w-full mt-10">
      <div className="p-5">
        <img src={image} alt="appPhoto" width={600} />
      </div>
      <div className="p-5">
        <h1 className="text-white text-3xl">{contentResult?.title}</h1>
        <div className="w-full flex flex-col my-5">
          <input
            className="my-2"
            onChange={(e) => setVoteWeight(+e.target.value)}
            type="range"
            min="-1000"
            max="1000"
            value="-1000"
          />
          <button
            onClick={handleVote}
            className={`${
              voteWeight < 0 ? "bg-red-500" : "bg-green-500"
            } focus:ring-2 cursor-pointer rounded-xl px-4 py-2 text-white text-xl hover:${
              voteWeight < 0 ? "bg-red-700" : "bg-green-700"
            } focus:${voteWeight < 0 ? "ring-red-600" : "ring-green-600"}`}
          >
            {voteWeight < 0 ? "Downvote" : "Upvote"} ({voteWeight})
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppDetails;
