import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
import hive from "@hiveio/hive-js";
import { Client } from "@hiveio/dhive";
import { comment, vote } from "../../utils";
import { useRecoilState, useRecoilValue } from "recoil";
import { broadcastState, ipfsLinkState, userState } from "../../atoms";
import { CommentCard } from "../../components/CommentCard";
import ReactMarkdown from "react-markdown";
import ReactJWPlayer from "react-jw-player";
import SimpleImageSlider from "react-simple-image-slider";

import { FaHeart, FaHeartBroken } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { useTranslation } from "next-export-i18n";
import { ImCross } from "react-icons/im";

const AppDetails = () => {
  var client = new Client([
    "https://api.hive.blog",
    "https://api.hivekings.com",
    "https://anyx.io",
    "https://api.openhive.network",
  ]);
  const [voteWeight, setVoteWeight] = useState(0);
  const [commentBody, setCommentBody] = useState("");
  const [playlist, setPlaylist] = useState<any>([]);
  const [contentData, setContentData] = useState<any>(null);
  const [speak, set3speak] = useState(false);
  const [color, setColor] = useState("#000");
  const [upVote, setUpVote] = useState(false);
  const [showBody, setShowBody] = useState(false);
  const [images, setImages] = useState<{ url: string }[]>([]);
  const [downVote, setDownVote] = useState(false);
  const [image, setImage] = useState("");
  const [showApp, setShowApp] = useState(false);
  const [username, setUsername] = useState("");
  const [comments, setComments] = useState([]);
  const [_broadcasts, setBroadcasts] = useRecoilState<any>(broadcastState);
  const [contentResult, setContentResult] = useState<any>(null);
  const [ipfsLink, setIpfsLink] = useRecoilState(ipfsLinkState);
  const router = useRouter();
  const user: any = useRecoilValue(userState);
  const { permlink, author } = router.query;
  const { t } = useTranslation();

  useEffect(() => {
    if (showApp) {
      document.title = `DLUX | ${contentResult.title}`;
      let metadata = contentResult.json_metadata;
      let hashy = JSON.parse(metadata).vrHash;
      let scrolling = JSON.parse(metadata).scrolling;
      let vars = location.href.split("?")[1];
      let iframe = document.createElement("iframe");
      iframe.id = "theIframe";
      iframe.setAttribute("scrolling", scrolling || "yes");
      iframe.width = "100%";
      iframe.height = "100%";
      iframe.setAttribute("allowfullscreen", "true");
      iframe.setAttribute(
        "allow",
        "gyroscope; accelerometer; microphone; camera"
      );
      iframe.src = `${ipfsLink}ipfs/${hashy}?${vars}`;
      if (document.getElementById("iframe-app")) {
        document.getElementById("iframe-app")!.appendChild(iframe);
      }
    }
  }, [showApp]);

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
      if (ipfsLink === "https://anywhere.ipfs.dlux.io/") {
        const subauthor = (author! as string)
          .substr(1, author!.length)
          .replace(".", "-");
        setIpfsLink(`https://${subauthor}.ipfs.dlux.io/`);
      }
      setUsername((author! as string).substr(1, author!.length));
    }
  }, []);

  const handleSendComment = () => {
    comment({
      author: user.name,
      title: "",
      body: commentBody,
      parent_author: username,
      parent_permlink: permlink as string,
      permlink: `re-previous-${username}-${permlink}`,
      json_metadata: JSON.stringify({ tags: ["hiveio"] }),
    });
    setCommentBody("");
  };

  useEffect(() => {
    if (username !== "") {
      hive.api.getContent(username, permlink, (err: any, result: any) => {
        if (err) console.log(err);
        setContentResult(result);
        setContentData(JSON.parse(result.json_metadata));
      });

      client.database
        .call("get_content_replies", [username, permlink])
        .then((result: any) => {
          setComments(result);
        });
    }
  }, [username]);

  useEffect(() => {
    if (contentData) {
      console.log(contentData);
      const imagesArray: { url: string }[] = [];

      contentData.image.forEach((image: string) => {
        imagesArray.push({ url: image });
      });

      if (imagesArray.length !== 0) {
        setImages(imagesArray);
      }

      if (contentData.app.includes("3speak")) {
        set3speak(true);
        const file: string =
          `https://ipfs.io/ipfs/` + contentData.video.info.ipfs;
        const image: string =
          `https://ipfs.io/ipfs/` + contentData.video.info.ipfsThumbnail;

        if (image && file) {
          setPlaylist((prevState: any) => [
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
  }, [contentData]);

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
    contentResult && (
      <div className="w-full mx-auto max-w-3xl">
        <div
          className={`${
            showBody ? "" : "hidden"
          } fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-75 z-50`}
        >
          <div className="flex justify-center items-center w-full h-full">
            <div className="w-2/3 h-auto relative bg-gray-500 border-2 border-gray-800 rounded-xl p-5">
              <button className="m-2 absolute top-0 right-0">
                <ImCross
                  size={15}
                  color="#fff"
                  opacity={100}
                  onClick={() => setShowBody(false)}
                />
              </button>

              {images.length !== 0 && (
                <div className="p-2">
                  <div className="rounded-xl flex justify-center">
                    <SimpleImageSlider
                      height={500}
                      width={1000}
                      images={images}
                      showBullets={true}
                      showNavs={true}
                    />
                  </div>
                </div>
              )}
              <h1 className="my-5 text-center text-white font-semibold text-xl">
                {contentResult.root_title}
              </h1>
              <ReactMarkdown className="mb-2 max-h-52 overflow-y-scroll text-white">
                {contentResult.body}
              </ReactMarkdown>
            </div>
          </div>
        </div>
        <div className="flex justify-evenly flex-col w-full mt-10">
          {speak ? (
            <div
              onClick={() => setShowBody(true)}
              className="cursor-pointer w-full flex justify-center my-2"
            >
              <ReactJWPlayer
                className="rounded-xl w-4/5"
                playerId="my-unique-id"
                playerScript="https://cdn.jwplayer.com/libraries/HT7Dts3H.js"
                playlist={playlist}
              />
            </div>
          ) : (
            <div
              onClick={() => setShowBody(true)}
              className="cursor-pointer flex justify-center w-full my-2"
            >
              <img src={image} className="w-4/5" alt="appPhoto" />
            </div>
          )}
          {JSON.parse(contentResult.json_metadata).vrHash && (
            <button
              className="mx-auto px-4 py-2 rounded-lg border-2 text-white bg-blue-500 border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-700"
              onClick={() => setShowApp(true)}
            >
              {t("runApp")}
            </button>
          )}
          <div className="p-5">
            <h1 className="text-white text-3xl">{contentResult?.title}</h1>
            <h1
              onClick={() => setShowBody(true)}
              className="text-white text-center sm:mx-3 sm:text-left text-lg cursor-pointer"
            >
              {JSON.parse(contentResult.json_metadata)?.description}
            </h1>
            <div className="flex items-center w-full my-5 mx-2 gap-2">
              {upVote ? (
                <div
                  onClick={handleVote}
                  className="flex text-white mx-1 gap-2 rounded-xl px-2 py-1 bg-green-500 cursor-pointer"
                >
                  <FaHeart size={25} color="#fff" />
                  {voteWeight / 100}%
                </div>
              ) : (
                <div className="px-2 py-1 cursor-pointer">
                  <FaHeart
                    size={25}
                    color="#fff"
                    onClick={() => {
                      setDownVote(false);
                      setUpVote(true);
                    }}
                  />
                </div>
              )}
              {downVote ? (
                <div
                  onClick={handleVote}
                  className="flex text-white mx-1 gap-2 rounded-xl px-2 py-1 bg-red-500 cursor-pointer"
                >
                  <FaHeartBroken size={25} color="#fff" />
                  {voteWeight / 100}%
                </div>
              ) : (
                <div className="px-2 py-1 cursor-pointer">
                  <FaHeartBroken
                    size={25}
                    color="#fff"
                    onClick={() => {
                      setUpVote(false);
                      setDownVote(true);
                    }}
                  />
                </div>
              )}
              <h1
                className="text-white text-xl cursor-pointer"
                onClick={() => {
                  setUpVote(false);
                  setDownVote(false);
                }}
              >
                ({contentResult.active_votes.length})
              </h1>
            </div>
            <div className="w-full">
              {upVote && (
                <input
                  className="my-2 w-full"
                  onChange={(e) => setVoteWeight(+e.target.value)}
                  type="range"
                  min="0"
                  max="10000"
                  value="0"
                />
              )}
              {downVote && (
                <input
                  className="my-2 w-full"
                  onChange={(e) => setVoteWeight(+e.target.value)}
                  type="range"
                  min="0"
                  max="10000"
                  value="0"
                />
              )}
            </div>
            <div className="my-2">
              <h1 className="text-white border-b-2 border-white pb-1 text-2xl">
                {t("comments")}
              </h1>
              <div className="relative flex">
                <input
                  type="text"
                  className="w-full outline-none p-2 rounded-xl my-2"
                  placeholder={t("writeComment")}
                  onChange={(e) => setCommentBody(e.target.value)}
                />
                <IoSend
                  color={color}
                  size={25}
                  onMouseEnter={() => setColor("#dcdcdc")}
                  onMouseLeave={() => setColor("#000")}
                  onClick={handleSendComment}
                  className="absolute right-4 top-4 cursor-pointer"
                />
              </div>
              <div className="flex flex-col justify-center gap-3 my-3">
                {comments.map((comment: any) => (
                  <CommentCard key={comment.id} comment={comment} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default AppDetails;
