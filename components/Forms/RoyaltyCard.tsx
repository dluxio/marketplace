import axios from "axios";
import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { apiLinkState } from "../../atoms";

export const RoyaltyCard = ({ set }: { set: string }) => {
  const apiLink = useRecoilValue(apiLinkState);

  useEffect(() => {
    axios.get(`${apiLink}api/set/${set}`).then(({ data }) => {
      console.log(data);
    });
  }, []);

  return (
    <div className="p-3 bg-gray-600 border-2 border-gray-800 rounded-xl mb-4 w-full mr-5">
      <h1>Something</h1>
    </div>
  );
};
