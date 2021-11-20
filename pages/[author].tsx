import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { apiLinkState } from "../atoms";
import { placeHolder } from "../constants";
import { redoAccountPicture } from "../utils";
import { Client } from "@hiveio/dhive";
import Image from "next/image";
import hive from "@hiveio/hive-js";

const User = () => {
  var client = new Client([
    "https://api.hive.blog",
    "https://api.hivekings.com",
    "https://anyx.io",
    "https://api.openhive.network",
  ]);
  const router = useRouter();
  const { author } = router.query;
  const [username, setUsername] = useState("");
  const [pfpData, setPfp] = useState<any>("");
  const apiLink: string = useRecoilValue(apiLinkState);

  useEffect(() => {
    if (!author) router.push("/");
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

      const query = [
        {
          tag: "disregardfiat",
          limit: 50,
          filter_tags: [],
          select_tags: [],
          truncate_body: 0,
        },
      ];
      console.log(query);

      client.database
        .getDiscussions("blog", query)
        .then((response) => console.log(response));
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
