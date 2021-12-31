import React from 'react'
import SimpleImageSlider from 'react-simple-image-slider/dist/ImageSlider'
import ReactJWPlayer from "react-jw-player";

type IPost = {
  title: string,
  body: string,
  images: { url: string }[],
  votes: any[],
  playlist?: any[],
  speak: boolean,
  author: any
}

export const PostCard = ({ title, body, images, votes, speak, playlist, author }: IPost) => {

  return (
    <div className="border border-gray-800 rounded-xl w-full bg-gray-600">
      <div className="rounded-t-xl">
        {speak ? (
          <div className="w-full flex justify-center">
            <ReactJWPlayer
              className="rounded-xl w-4/5"
              playerId="my-unique-id"
              playerScript="https://cdn.jwplayer.com/libraries/HT7Dts3H.js"
              playlist={playlist}
            />
          </div>
        ) : (
          <SimpleImageSlider
            height={500}
            width={1000}
            images={images}
            style={{ width: '100%', height: '100%' }}
            showBullets={false}
            showNavs={true}
          />
        )}
      </div>
    </div>
  )
}
