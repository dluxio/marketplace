import React, { useEffect } from "react";

export const CommentCard = ({ comment }: { comment: any }) => {
  useEffect(() => {
    const commentElem = document.getElementById(`comment-body-${comment.id}`);
    if (commentElem) {
      commentElem!.innerHTML = comment.body;
    }
  }, []);

  return (
    <div className="text-black">
      <a target="_blank" href={`https://peakd.com/@${comment.author}`}>
        <h1 className="text-xl hover:text-blue-200 cursor-pointer">
          {comment.author}
        </h1>
      </a>
      <h1 id={`comment-body-${comment.id}`} className="text-white mx-2"></h1>
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
