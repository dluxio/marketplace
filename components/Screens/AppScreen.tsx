import React, { useEffect, useState } from "react";
import axios from "axios";
import Masonary from "react-masonry-css";

import { AppCard } from "../Card/AppCard";
import { useQuery } from "../../constants/breakpoints";

export const AppScreen = () => {
  const { isTablet, isMobile } = useQuery();
  const [apps, setApps] = useState([]);

  useEffect(() => {
    axios.get("https://data.dlux.io/new").then(({ data }) => {
      setApps(data.result);
    });
  }, []);
  const getCols = () => (isTablet ? (isMobile ? 1 : 2) : 3);

  return (
    <Masonary
      breakpointCols={getCols()}
      className="masonry-grid sm:mx-4"
      columnClassName="masonry-grid_column"
    >
      {apps.map((app: any) => {
        return <AppCard key={app.permlink} app={app} />;
      })}
    </Masonary>
  );
};
