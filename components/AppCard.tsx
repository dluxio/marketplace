import React, { useEffect } from "react";
import hive from "@hiveio/hive-js";

type AppCardProps = {
  app: any;
  setOpenApp: Function;
};

export const AppCard = ({ app, setOpenApp }: AppCardProps) => {
  const handleRunApp = async (permlink: never, author: never) => {
    hive.api.getContent(
      author,
      permlink,
      (err: any, result: { title: any; json_metadata: any }) => {
        if (err) console.log(err);
        document.title = `DLUX | ${result.title}`;
        var metadata = result.json_metadata;
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
      }
    );
  };

  useEffect(() => {
    //TODO: Added a getContent call
  }, []);

  return (
    <div className="flex items-center justify-between border-2 text-white p-3 rounded-xl border-gray-800 bg-gray-600">
      <div>
        <h1
          className={
            app.paid
              ? app.promote > 0
                ? "text-yellow-500"
                : "text-blue-500"
              : "text-gray-300"
          }
        >
          {app.author}
        </h1>
        <h1>Votes - {app.votes}</h1>
      </div>
      <div className="flex justify-center">
        <button
          onClick={() =>
            handleRunApp(app.permlink as never, app.author as never)
          }
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
  );
};
