import React from 'react'
import { GrFacebook, GrInstagram, GrGithub, GrLinkedin, GrTwitter } from 'react-icons/gr'
import { RiUser3Fill, RiMapPinUserFill, RiLinksFill } from 'react-icons/ri'
import { placeHolder } from '../../constants'

type IProfileCard = { userData: any, username: { provider: string, username: string }, author: string }

const urls: string[] = ["https://", "http://"];

export const ProfileCard = ({ userData, username, author }: IProfileCard) => {
  const formatWebsite = (url: string) => {
    let result = "";

    urls.forEach((start) => {
      if (url.includes(start)) {
        result = url.split("").splice(start.length, url.length).join("");

        if (result.includes("www.")) {
          result = url.split("www.", result.length)[1];
        }
      }
    });

    return result || url;
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div
        className={`relative overflow-hidden border-2 text-white p-5 rounded-xl border-gray-800 ${
          userData?.cover_image ? "bg-black" : "bg-gray-600"
        } flex-col ${
          userData ? "flex" : "hidden"
        } sm:flex-row items-center sm:items-start gap-3 w-full`}
      >
        <div className="flex flex-col items-center justify-center z-10">
          {userData && (
            <img
              height={165}
              width={165}
              src={
                userData.profile_image ? userData.profile_image : placeHolder
              }
              alt="profile"
            />
          )}
          <h1 className="text-xl my-2">
            {username.provider === "hive" ? author : userData?.name}
          </h1>
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
                  <h1>{formatWebsite(userData.website)}</h1>
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
  );
};
