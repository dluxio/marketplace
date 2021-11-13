import React, { useEffect, useState } from "react";
import { FaReply } from "react-icons/fa";
import { IoSend } from "react-icons/io5";

export const CommentCard = ({ comment }: { comment: any }) => {
  const [reply, setReply] = useState(false);
  const [replyBody, setReplyBody] = useState("");
  const [color, setColor] = useState("#000");

  useEffect(() => {
    const commentElem = document.getElementById(`comment-body-${comment.id}`);
    if (commentElem) {
      commentElem!.innerHTML = comment.body;
    }
  }, []);

  const handleSendReply = () => {};

  return (
    <div className="text-black">
      <a target="_blank" href={`https://peakd.com/@${comment.author}`}>
        <h1 className="text-xl hover:text-blue-200 cursor-pointer">
          {comment.author}
        </h1>
      </a>
      <div className="text-white mx-2">
        <h1 id={`comment-body-${comment.id}`}></h1>
        <div className="w-auto">
          <div className="flex">
            <div
              onClick={() => setReply(!reply)}
              className="hover:bg-gray-600 px-2 py-1 rounded-xl flex items-center gap-2"
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
              <h1 className="text-xl hover:text-blue-200 cursor-pointer">
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
