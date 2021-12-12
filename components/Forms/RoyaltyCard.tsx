import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { apiLinkState } from "../../atoms";

export const RoyaltyCard = ({ set }: { set: string }) => {
  const [assignData, setAssignData] = useState({
    username: "",
    percentage: 0,
  });
  const apiLink = useRecoilValue(apiLinkState);

  useEffect(() => {
    console.log(set);
    axios.get(`${apiLink}api/set/${set}`).then(({ data }) => {
      console.log(data);
    });
  }, []);

  const handleRoyalties = () => {
    console.log("ROYALTY SET ", {
      set,
      distro: `${assignData.username}_${assignData.percentage * 100}`,
    });
  };

  return (
    <div className="p-3 bg-gray-600 border-2 border-gray-800 rounded-xl mb-4 w-full mx-5 sm:w-3/4 mr-5">
      <h1 className="text-center">Assign royalties</h1>
      <div className="my-2">
        <label htmlFor="username">@Username</label>
        <input
          onChange={(e) =>
            setAssignData({ ...assignData, username: e.target.value })
          }
          placeholder="Username to assign..."
          name="username"
          type="text"
          className="px-3 py-1 rounded-lg border bg-gray-500 border-gray-300 focus:outline-none focus:ring-2 w-full focus:ring-gray-200"
        />
      </div>
      <div className="my-2 relative">
        <label className="absolute right-9 top-1" htmlFor="percentage">
          %
        </label>
        <input
          onChange={(e) =>
            setAssignData({ ...assignData, percentage: +e.target.value })
          }
          className="px-3 w-full py-1 rounded-lg border bg-gray-500 border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
          min="1"
          name="percentage"
          max="100"
          type="number"
          step={0.1}
          defaultValue={1}
        />
      </div>
      <div className="flex justify-center">
        <button
          onClick={handleRoyalties}
          className="rounded-lg border border-white py-1 px-6 bg-gray-500 focus:ring-4 mx-auto focus:outline-none focus:ring-gray-700"
        >
          Assign
        </button>
      </div>
    </div>
  );
};
