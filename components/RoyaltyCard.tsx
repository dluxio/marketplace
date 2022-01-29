import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { apiLinkState, prefixState, userState } from "../atoms";
import { addRoyalties } from "../utils";

export const RoyaltyCard = ({ set }: { set: string }) => {
  const apiLink: string = useRecoilValue(apiLinkState);
  const user: any = useRecoilValue(userState);
  const prefix: string = useRecoilValue(prefixState);
  const [royaltyObject, setRoyaltyObject] = useState<any>({});
  const [assignData, setAssignData] = useState({
    username: "",
    percentage: 0,
  });

  useEffect(() => {
    if (user && set) {
      axios.get(`${apiLink}api/set/${set}`).then(({ data }) => {
        const royaltyValues: any = {};

        data.set.royalty_accounts.split(",").forEach((dataPoint: string) => {
          royaltyValues[dataPoint.split("_")[0]] = +dataPoint.split("_")[1];
        });

        setRoyaltyObject(royaltyValues);
      });
    }
  }, []);

  const handleRoyalties = () => {
    const removePercentageFrom = royaltyObject[user.name];
    const userPercentage = (removePercentageFrom / 100) * assignData.percentage;
    royaltyObject[user.name] = removePercentageFrom - userPercentage;
    royaltyObject[assignData.username] = userPercentage;

    let royaltyString = "";
    Object.keys(royaltyObject).forEach(
      (key) => (royaltyString += `${key}_${royaltyObject[key]},`)
    );

    addRoyalties(royaltyString, set, user.name, prefix);
  };

  return user && royaltyObject[user.name] ? (
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
          min={1}
          name="percentage"
          max={100}
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
  ) : (
    <div className="mb-10">
      <h1>You can't assign royalties</h1>
    </div>
  );
};
