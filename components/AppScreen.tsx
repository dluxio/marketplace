import React, { useEffect, useState } from "react";

import hive from "@hiveio/hive-js";
import axios from "axios";
import { ImCross } from "react-icons/im";

export const AppScreen = () => {
  const [openApp, setOpenApp] = useState(false);
  const [apps, setApps] = useState([]);

  useEffect(() => {
    axios.get("https://data.dlux.io/new").then(({ data }) => {
      setApps(data.result);
    });
  }, []);

  const handleRunApp = async (permlink: never, author: never) => {
    hive.api.getContent(
      author,
      permlink,
      (err: any, result: { title: any; json_metadata: any }) => {
        if (err) console.log(err);
        console.log(result);
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

  const handleClose = () => {
    setOpenApp(false);
    if (document.getElementById("iframe-app")) {
      document.getElementById("iframe-app")!.innerHTML = "";
    }
  };

  return (
    <div className={`mx-10 grid grid-cols-1 sm:grid-cols-4 gap-3`}>
      {apps.map(({ author, permlink }) => (
        <div className="flex items-center justify-between border-2 text-white p-3 rounded-xl border-gray-800 bg-gray-600">
          <h1>{author}</h1>
          <div className="flex justify-center">
            <button
              onClick={() => handleRunApp(permlink, author)}
              className="px-7 py-2 rounded-lg bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-700"
            >
              Run
            </button>
          </div>
        </div>
      ))}
      {openApp && (
        <div
          id="iframe-app"
          className="w-screen overflow-hidden h-screen fixed top-0 left-0 z-50"
        >
          <button className="bg-black p-2 rounded-full m-2 absolute top-0 left-0">
            <ImCross
              size={30}
              color="#fff"
              opacity={100}
              onClick={handleClose}
            />
          </button>
        </div>
      )}
    </div>
  );
};
