import axios from "axios";
import React, { useEffect, useState } from "react";
import Masonary from "react-masonry-css";
import { isMobile } from "react-device-detect";
import { PostCard } from "../Card/PostCard";

type SPKPost = {
  permlink: string;
  creator_id: string;
  content: any;
  last_updated: string;
};

export const NewsScreen = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://us-01.infra.3speak.tv/api/v0/indexer/feed?pageSize=20&page=1"
      )
      .then(({ data }) => {
        setPosts(data);
      });
  }, []);

  return (
    <div className="mx-10 mb-5 text-white">
      <Masonary
        breakpointCols={isMobile ? 1 : 3}
        className="masonry-grid sm:mx-4"
        columnClassName="masonry-grid_column"
      >
        {posts.map((post: SPKPost) => {
          console.log(post);

          return (
            <PostCard
              date={new Date(post.last_updated)}
              key={post.permlink}
              author={post.creator_id ? post.creator_id : "unknown"}
              permlink={post.permlink}
              title={post.content?.title ? post.content.title : ""}
              images={[]}
            />
          );
        })}
      </Masonary>
    </div>
  );
};
