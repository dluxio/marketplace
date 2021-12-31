import React from "react";
import SimpleImageSlider from "react-simple-image-slider/dist/ImageSlider";
import ReactJWPlayer from "react-jw-player";

type IPost = {
  title: string;
  body: string;
  images?: { url: string }[];
  votes: any[];
  playlist?: any[];
  speak: boolean;
  author: any;
};

export const PostCard = ({
  title,
  body,
  images,
  votes,
  speak,
  playlist,
  author,
}: IPost) => {
  return (
    <div className="border border-gray-800 rounded-xl w-full bg-gray-600">
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
        ) : images && images.length === 1 ? (
          <img
            className="w-full h-full rounded-t-xl"
            src={images[0].url}
            alt="thumbnail"
          />
        ) : (
          <SimpleImageSlider
            height="100%"
            width="100%"
            style={{
              borderTopLeftRadius: "0.75rem",
              borderTopRightRadius: "0.75rem",
            }}
            images={images!}
            showBullets={false}
            showNavs={true}
          />
        )}
      </div>
    </div>
  );
};
