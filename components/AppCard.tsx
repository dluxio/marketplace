import React, { useEffect, useState } from "react";
import hive from "@hiveio/hive-js";

type AppCardProps = {
  app: any;
  setOpenApp: Function;
};

export const AppCard = ({ app, setOpenApp }: AppCardProps) => {
  const [image, setImage] = useState<any>("");
  const [contentResult, setContentResult] = useState<any>(null);

  const handleRunApp = () => {
    document.title = `DLUX | ${contentResult.title}`;
    var metadata = contentResult.json_metadata;
    var hashy = JSON.parse(metadata).vrHash;
    var scrolling = JSON.parse(metadata).scrolling;
    var vars = location.href.split("?")[1];
    var iframe = document.createElement("iframe");
    iframe.id = "theIframe";
    iframe.setAttribute("scrolling", scrolling || "yes");
    iframe.width = "100%";
    iframe.height = "100%";
    iframe.setAttribute("allowfullscreen", "true");
    iframe.setAttribute(
      "allow",
      "gyroscope; accelerometer; microphone; camera"
    );
    iframe.src = `https://anywhere.ipfs.dlux.io/ipfs/${hashy}?${vars}`;
    setOpenApp(true);
    if (document.getElementById("iframe-app")) {
      document.getElementById("iframe-app")!.appendChild(iframe);
    }
  };

  useEffect(() => {
    const fetchImage = (json: any) => {
      let imagestring;
      if (json.image && Array.isArray(json.image)) {
        imagestring = json.image[0];
      } else if (typeof json.image == "string") {
        imagestring = json.image;
      } else if (json.Hash360 && typeof json.Hash360) {
        imagestring = `https://ipfs.io/ipfs/${json.Hash360}`;
      } else {
        imagestring = "https://www.dlux.io/img/dlux-sdk.png";
      }
      if (imagestring.substr(0, 5) !== "https") {
        imagestring = "https://www.dlux.io/img/dlux-sdk.png";
      }
      setImage(imagestring);
    };

    const { author, permlink } = app;
    hive.api.getContent(author, permlink, (err: any, result: any) => {
      if (err) console.log(err);
      setContentResult(result);
      fetchImage(JSON.parse(result.json_metadata));
    });
  }, []);

  return (
    <div className="border-2 text-white p-3 rounded-xl border-gray-800 bg-gray-600">
      <div className="flex justify-center">
        {image && <img src={image} className="w-full h-60" alt="appPhoto" />}
      </div>
      <h1
        className={`text-center my-2 text-xl ${
          app.paid
            ? app.promote > 0
              ? "text-yellow-500"
              : "text-blue-500"
            : "text-gray-300"
        }`}
      >
        {contentResult?.title}
      </h1>
      <div className="flex items-center justify-between">
        <div>
          <h1>Author - {app.author}</h1>
          <h1>Votes - {app.votes}</h1>
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => handleRunApp()}
            className={`${
              app.paid
                ? app.promote > 0
                  ? "bg-yellow-500"
                  : "bg-blue-500"
                : "bg-gray-500"
            } px-7 py-2 rounded-lg  focus:outline-none focus:ring-2 focus:ring-yellow-700`}
          >
            Run
          </button>
        </div>
      </div>
    </div>
  );
};
