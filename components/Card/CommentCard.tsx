import React, { useEffect, useState } from "react";
import { Client } from "@hiveio/dhive";
import { useRouter } from "next/router";
import { FaReply } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { useRecoilValue } from "recoil";
import { userState } from "../../atoms";
import { replyComment } from "../../utils";
import { hiveApi, placeHolder } from "../../constants";

export const CommentCard = ({ comment }: { comment: any }) => {
  const user: any = useRecoilValue(userState);
  const router = useRouter();
  const client = new Client(hiveApi);
  const [pfp, setPfp] = useState(placeHolder);
  const [reply, setReply] = useState(false);
  const [replyBody, setReplyBody] = useState("");
  const [color, setColor] = useState("#000");

  useEffect(() => {
    const commentElem = document.getElementById(`comment-body-${comment.id}`);
    if (commentElem) {
      commentElem!.innerHTML = comment.body;
    }

    client.database.getAccounts([comment.author]).then((profiles: any) => {
      setPfp(
        JSON.parse(profiles[0].posting_json_metadata).profile.profile_image
      );
    });
  }, []);

  const handleSendReply = () => {
    replyComment({
      author: user.name,
      body: replyBody,
      parent_author: comment.author,
      parent_permlink: comment.permlink,
      permlink: `re-previous-${comment.author}-${comment.permlink}`,
    });
  };

  return (
    <div className="text-white bg-gray-600 p-4 rounded-xl border-2 border-gray-800">
      <div className="flex gap-2 items-center mb-2">
        <img
          src={pfp}
          className="rounded-full border-2 border-gray-800"
          height={45}
          width={45}
          alt="profile_picture"
        />
        <h1
          onClick={() => router.push(`/@${comment.author}`)}
          className="text-xl hover:text-gray-700 transition-all cursor-pointer"
        >
          {comment.author}
        </h1>
      </div>
      <div className="text-white mr-1 ml-2 whitespace-pre-wrap break-words">
        <div id={`comment-body-${comment.id}`}></div>
        <div className="w-auto">
          <div className="flex">
            <div
              onClick={() => setReply(!reply)}
              className="hover:bg-gray-700 px-2 py-1 my-1 rounded-xl cursor-pointer flex items-center gap-2"
            >
              <FaReply size={20} color="#fff" className="my-3" />(
              {comment.replies.length})
            </div>
          </div>
          {reply && (
            <div className="relative flex w-1/2">
              <input
                type="text"
                className="text-black w-full outline-none p-2 rounded-xl my-2"
                placeholder="Write a reply"
                onChange={(e) => setReplyBody(e.target.value)}
              />
              <IoSend
                color={color}
                size={25}
                onMouseEnter={() => setColor("#dcdcdc")}
                onMouseLeave={() => setColor("#000")}
                onClick={handleSendReply}
                className="absolute right-4 top-4 cursor-pointer"
              />
            </div>
          )}
        </div>
      </div>
      {comment.replies.map((replie: any) => {
        const replieElem = document.getElementById(
          `comment-body-${comment.id}-replie-${replie.id}`
        );
        if (replieElem) {
          replieElem!.innerHTML = replie.body;
        }

        return (
          <div key={replie.id} className="mx-3">
            <h1
              onClick={() => router.push(`/@${comment.author}`)}
              className="text-xl font-semibold text-white hover:text-gray-700 cursor-pointer"
            >
              {replie.author}
            </h1>
            <h1
              id={`comment-body-${comment.id}-replie-${replie.id}`}
              className="text-white mx-2"
            ></h1>
          </div>
        );
      })}
    </div>
  );
};
