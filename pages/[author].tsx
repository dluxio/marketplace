import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { apiLinkState } from "../atoms";
import { placeHolder } from "../constants";
import { redoAccountPicture } from "../utils";
import { Client, Discussion } from "@hiveio/dhive";
import { NewsPost } from "../components/NewsPost";
import { RiMapPinUserFill, RiUser3Fill, RiLinksFill } from "react-icons/ri";
import {
  GrFacebook,
  GrLinkedin,
  GrGithub,
  GrInstagram,
  GrTwitter,
} from "react-icons/gr";
import { useTranslation } from "next-export-i18n";

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
  const { t } = useTranslation();

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
    <div className="flex flex-col text-white my-10 mx-2 sm:mx-10">
      <div className="flex flex-col items-center w-full">
        <div
          className={`relative overflow-hidden border-2 text-white p-5 rounded-xl border-gray-800 ${
            userData?.cover_image ? "bg-black" : "bg-gray-600"
          } flex flex-col sm:flex-row items-center h-full sm:items-start gap-3 w-full`}
        >
          <div className="flex flex-col items-center justify-center z-10">
            {userData && !userData.profile_image.includes("dlux") ? (
              <img
                height={165}
                width={165}
                src={
                  userData.profile_image ? userData.profile_image : placeHolder
                }
                alt="profile"
              />
            ) : (
              <div className="w-52" id="account-picture"></div>
            )}
            <h1 className="text-xl my-2">{author}</h1>
          </div>
          {userData && (
            <div className="z-40 mx-5 my-auto">
              <h1 className="text-2xl mt-2">{userData?.name}</h1>
              {userData.about && (
                <div className="flex items-center gap-2">
                  <RiUser3Fill />
                  <h1>{userData.about}</h1>
                </div>
              )}
              {userData.location && (
                <div className="flex items-center gap-2">
                  <RiMapPinUserFill />
                  <h1>{userData.location}</h1>
                </div>
              )}
              {userData.website && (
                <a target="_blank" href={userData.website}>
                  <div className="flex items-center gap-2 hover:text-gray-300">
                    <RiLinksFill />
                    <h1>
                      {userData.website.substr(0, 12) === "https://www."
                        ? userData.website.substr(12, userData.website.length)
                        : userData.website}
                    </h1>
                  </div>
                </a>
              )}
            </div>
          )}
          {userData && (
            <div className="sm:absolute z-20 right-7 bottom-6 flex gap-3">
              {userData.facebook && (
                <a
                  target="_blank"
                  href={"https://www.facebook.com/" + userData.facebook}
                  className="hover:text-gray-300"
                >
                  <GrFacebook size={25} />
                </a>
              )}
              {userData.instagram && (
                <a
                  target="_blank"
                  className="hover:text-gray-300"
                  href={"https://www.instagram.com/" + userData.instagram}
                >
                  <GrInstagram size={25} />
                </a>
              )}
              {userData.github && (
                <a
                  target="_blank"
                  className="hover:text-gray-300"
                  href={"https://www.github.com/" + userData.github}
                >
                  <GrGithub size={25} />
                </a>
              )}
              {userData.linkedin && (
                <a
                  target="_blank"
                  className="hover:text-gray-300"
                  href={"https://www.linkedin.com/" + userData.linkedin}
                >
                  <GrLinkedin size={25} />
                </a>
              )}
              {userData.twitter && (
                <a
                  target="_blank"
                  className="hover:text-gray-300"
                  href={"https://www.twitter.com/" + userData.twitter}
                >
                  <GrTwitter size={25} />
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
        <h1 className="my-3 font-bold text-xl">{t("recent")}</h1>
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
