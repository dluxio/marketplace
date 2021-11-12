import React, { useEffect } from "react";

export const CommentCard = ({ comment }: { comment: any }) => {
  useEffect(() => {
    const commentElem = document.getElementById(`comment-body-${comment.id}`);
    if (commentElem) {
      commentElem!.innerHTML = comment.body;
    }
  }, []);

  return (
    <div className="">
      <h1>{comment.author}</h1>
      <h1 id={`comment-body-${comment.id}`} className="text-white"></h1>
    </div>
  );
};
