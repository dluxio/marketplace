import React, { useEffect, useState } from "react";

import axios from "axios";
import { AppCard } from "../Card/AppCard";

export const AppScreen = () => {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    axios.get("https://data.dlux.io/new").then(({ data }) => {
      setApps(data.result);
    });
  }, []);

  return (
    <div className={`mx-10 mb-5 grid grid-cols-1 sm:grid-cols-3 gap-3`}>
      {apps.map((app: any) => {
        return <AppCard key={app.permlink} app={app} />;
      })}
    </div>
  );
};
