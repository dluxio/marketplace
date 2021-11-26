import router from "next/router";
import React, { useEffect, useState } from "react";
import { FaReply } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { useRecoilValue } from "recoil";
import { userState } from "../atoms";
import { replyComment } from "../utils";
import hive from "@hiveio/hive-js";

export const CommentCard = ({ comment }: { comment: any }) => {
  const user: any = useRecoilValue(userState);
  const [reply, setReply] = useState(false);
  const [replyBody, setReplyBody] = useState("");
  const [color, setColor] = useState("#000");

  useEffect(() => {
    const commentElem = document.getElementById(`comment-body-${comment.id}`);
    if (commentElem) {
      commentElem!.innerHTML = comment.body;
    }
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

  useEffect(() => {
    console.log(comment);

    hive.api.getDiscussionsByComments(
      {
        start_author: comment.author,
        start_permlink: comment.permlink,
        limit: 10,
      },
      function (err: any, result: any) {
        console.log(result);
      }
    );
  });

  return (
    <div className="text-white bg-gray-600 p-4 rounded-xl border-2 border-gray-800">
      <h1
        onClick={() => router.push(`/@${comment.author}`)}
        className="text-xl font-semibold mb-2 hover:text-blue-200 cursor-pointer"
      >
        {comment.author}
      </h1>
      <div className="text-white mx-1 whitespace-pre-wrap break-words">
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
          <div className="mx-3">
            <a target="_blank" href={`https://peakd.com/@${replie.author}`}>
              <h1 className="text-xl font-semibold text-white hover:text-blue-200 cursor-pointer">
                {replie.author}
              </h1>
            </a>
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
