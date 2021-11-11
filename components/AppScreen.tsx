import React, { useEffect, useState } from "react";

import axios from "axios";
import { ImCross } from "react-icons/im";
import { AppCard } from "./AppCard";

export const AppScreen = () => {
  const [openApp, setOpenApp] = useState(false);
  const [apps, setApps] = useState([]);

  useEffect(() => {
    axios.get("https://data.dlux.io/new").then(({ data }) => {
      setApps(data.result);
    });
  }, []);

  const handleClose = () => {
    setOpenApp(false);
    if (document.getElementById("iframe-app")) {
      document.getElementById("iframe-app")!.innerHTML = "";
    }
  };

  return (
    <div className={`mx-10 mb-5 grid grid-cols-1 sm:grid-cols-3 gap-3`}>
      {apps.map((app) => (
        <AppCard app={app} setOpenApp={setOpenApp} />
      ))}
      {openApp && (
        <div
          id="iframe-app"
          className="w-screen bg-gray-500 overflow-hidden h-screen fixed top-0 left-0 z-50"
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
