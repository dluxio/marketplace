import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { apiLinkState } from "../atoms";
import { placeHolder } from "../constants";
import { redoAccountPicture } from "../utils";
import Image from "next/image";

const User = () => {
  const router = useRouter();
  const { author } = router.query;
  const [username, setUsername] = useState("");
  const [pfpData, setPfp] = useState<any>("");
  const apiLink: string = useRecoilValue(apiLinkState);

  useEffect(() => {
    if (author && (author! as string).substr(0, 1) === "@") {
      setUsername((author! as string).substr(1, author!.length));
    } else {
      setUsername(author as string);
    }
  }, []);

  useEffect(() => {
    if (username) {
      axios.get(`${apiLink}api/pfp/${username}`).then(({ data }) => {
        setPfp(data.result[0]);
      });
    }
  }, [username]);

  useEffect(() => {
    if (pfpData) {
      const uid = pfpData.pfp?.split(":");
      const script = pfpData.set?.s;

      if (pfpData.pfp !== placeHolder) {
        if (uid && script) {
          redoAccountPicture({ script, uid });
        }
      }
    }
  }, [pfpData]);

  return (
    <div className="flex flex-col sm:flex-row sm:justify-evenly text-white my-10">
      <div className="flex flex-col items-center">
        <div className="w-52" id="account-picture">
          <Image height={120} width={120} src={placeHolder} alt="profile" />
        </div>
        <h1 className="text-2xl">@{username}</h1>
      </div>
      <div>
        <h1>Something</h1>
      </div>
    </div>
  );
};

export default User;