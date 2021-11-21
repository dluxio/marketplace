import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { apiLinkState } from "../atoms";
import { placeHolder } from "../constants";
import { redoAccountPicture } from "../utils";
import { Client, Discussion } from "@hiveio/dhive";
import Image from "next/image";
import { NewsPost } from "../components/NewsPost";
import { RiMapPinUserFill, RiUser3Fill, RiLinksFill } from "react-icons/ri";

const User = () => {
  var client = new Client([
    "https://api.hive.blog",
    "https://api.hivekings.com",
    "https://anyx.io",
    "https://api.openhive.network",
  ]);
  const router = useRouter();
  const { author } = router.query;
  const [username, setUsername] = useState("");
  const [posts, setPosts] = useState<Discussion[]>([]);
  const [userData, setUserData] = useState<any>(null);
  const [pfpData, setPfp] = useState<any>("");
  const apiLink: string = useRecoilValue(apiLinkState);

  useEffect(() => {
    if (author && (author! as string).substr(0, 1) === "@") {
      setUsername((author! as string).substr(1, author!.length));
    } else {
      setUsername(author as string);
    }
  }, [author]);

  useEffect(() => {
    if (username) {
      axios.get(`${apiLink}api/pfp/${username}`).then(({ data }) => {
        setPfp(data.result[0]);
      });

      const query = {
        tag: username,
        limit: 10,
      };

      client.database.getDiscussions("blog", query).then((response) => {
        setPosts(response);
      });

      client.database.getAccounts([username]).then((response: any) => {
        if (response[0]) {
          console.log(JSON.parse(response[0].posting_json_metadata).profile);
          setUserData(JSON.parse(response[0].posting_json_metadata).profile);
        }
      });
    }
  }, [username]);

  useEffect(() => {
    if (pfpData) {
      const uid = pfpData.pfp?.split(":");
      const script = pfpData.set?.s;

      if (pfpData.pfp !== placeHolder) {
        if (uid && script) {
          redoAccountPicture({ script, uid });
        }
      }
    }
  }, [pfpData]);

  return (
    <div className="flex flex-col text-white my-10 mx-10">
      <div className="flex flex-col items-center w-full">
        <div
          className={`relative overflow-hidden border-2 text-white p-5 rounded-xl border-gray-800 ${
            userData?.cover_image ? "bg-black" : "bg-gray-600"
          } flex flex-col sm:flex-row items-center h-full sm:items-start gap-3 w-full`}
        >
          <div className="flex flex-col items-center justify-center z-10">
            <div className="w-52 flex justify-center" id="account-picture">
              <Image height={120} width={120} src={placeHolder} alt="profile" />
            </div>
            <h1 className="text-2xl mt-2">{author}</h1>
          </div>
          {userData && (
            <div className="z-40 mx-5 my-auto">
              <div className="flex items-center gap-2">
                <RiUser3Fill />
                <h1>{userData.about}</h1>
              </div>
              <div className="flex items-center gap-2">
                <RiMapPinUserFill />
                <h1>{userData.location}</h1>
              </div>
              {userData.website && (
                <a target="_blank" href={userData.website}>
                  <div className="flex items-center gap-2 hover:text-gray-300">
                    <RiLinksFill />
                    <h1>{userData.website}</h1>
                  </div>
                </a>
              )}
            </div>
          )}
          {userData && userData.cover_image && (
            <img
              className="absolute top-0 left-0 z-0 w-full pb-1 opacity-40"
              src={userData.cover_image}
              width={120}
              height={120}
              alt="coverPhoto"
            />
          )}
        </div>
      </div>
      <div className="text-center">
        <h1 className="my-3 font-bold text-xl">BLOG</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full my-4">
          {posts.map((post) => (
            <NewsPost key={post.permlink} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default User;
