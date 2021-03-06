import React, { useEffect, useState } from "react";
import ReactJWPlayer from "react-jw-player";
import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";
import { RiHeartFill } from "react-icons/ri";
import { useRouter } from "next/router";
import { MdComment } from "react-icons/md";
import { useHiveKeychainCeramic } from "@spknetwork/auth-react";
import { ceramicApi, hiveApi, placeHolder } from "../../constants";
import { Client } from "@hiveio/dhive";
dayjs.extend(RelativeTime);

type IPost = {
  title: string;
  images?: string[];
  votes?: any[];
  author: any;
  permlink: string;
  date: Date;
};

export const PostCard = ({
  title,
  images,
  votes = [],
  author,
  permlink,
  date,
}: IPost) => {
  const client = new Client(hiveApi);
  const [speak, setSpeak] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [username, setUsername] = useState(author);
  const [profilePicture, setProfilePicture] = useState(placeHolder);
  const router = useRouter();
  const connector = useHiveKeychainCeramic(ceramicApi);

  useEffect(() => {
    const getCeramicProfile = async (didId: string) => {
      const response = await connector.idxUtils.getUserProfile(didId);
      return response;
    };

    if (author.split(":")[0] === "did") {
      getCeramicProfile(author).then((profile: any) => {
        setUsername(profile?.name);
        setProfilePicture(
          profile?.image
            ? "https://ipfs-3speak.b-cdn.net/ipfs/" +
                profile?.image.original.src.split("ipfs://")[1]
            : placeHolder
        );
      });
    } else {
      client.database.getAccounts([author]).then((response: any) => {
        if (response[0]) {
          setProfilePicture(
            JSON.parse(response[0].posting_json_metadata).profile.profile_image
          );
        }
      });
    }
  }, []);

  return (
    <div className="border-2 my-3 border-gray-800 rounded-xl w-full bg-gray-600">
      <div className="rounded-t-xl">
        {speak ? (
          <div className="w-full flex justify-center">
            <ReactJWPlayer
              className="rounded-t-xl w-full"
              playerId="my-unique-id"
              playerScript="https://cdn.jwplayer.com/libraries/HT7Dts3H.js"
              playlist={playlist}
            />
          </div>
        ) : (
          images &&
          images.length >= 1 && (
            <img
              className="w-full h-full rounded-t-xl border-b-2 border-gray-800"
              src={images[0]}
              alt="thumbnail"
            />
          )
        )}
      </div>
      <div className="pt-2 px-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img
              src={profilePicture}
              className="rounded-full"
              height={30}
              width={30}
              alt="profile_picture"
            />
            <h1
              className="hover:text-gray-300 cursor-pointer"
              onClick={() =>
                author.split(":")[0] !== "did" && router.push(`/@${username}`)
              }
            >
              {username}
            </h1>
          </div>
          <h1>{dayjs().to(date)}</h1>
        </div>
        <div className="flex justify-center">{title}</div>
        <div className="p-2 flex justify-center gap-2">
          <button
            onClick={() => router.replace(`/@${author}/${permlink}`)}
            className="flex gap-1 items-center bg-red-500 hover:bg-red-600 transition-all p-1 px-2 rounded-xl"
          >
            <RiHeartFill /> {votes ? votes.length : 0}
          </button>
          <button
            onClick={() => router.replace(`/@${author}/${permlink}`)}
            className="flex gap-1 justify-center px-5 items-center bg-blue-500 hover:bg-blue-600 transition-all p-1 rounded-xl"
          >
            <MdComment />
          </button>
        </div>
      </div>
    </div>
  );
};
