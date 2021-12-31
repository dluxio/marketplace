import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ceramicApi, hiveApi } from "../constants";
import { Client, Discussion } from "@hiveio/dhive";
import { NewsPost } from "../components/NewsPost";
import { useTranslation } from "next-export-i18n";
import { useHiveKeychainCeramic } from "spk-auth-react";
import { getUserPosts } from "../utils";
import { ProfileCard } from "../components/Card/ProfileCard";

const User = () => {
  const client = new Client(hiveApi);
  const connector = useHiveKeychainCeramic(ceramicApi);
  const router = useRouter();
  const { author } = router.query;
  const [username, setUsername] = useState({ username: "", provider: "" });
  const [posts, setPosts] = useState<Discussion[]>([]);
  const [userData, setUserData] = useState<any>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (author && (author! as string).slice(0, 1) === "@") {
      setUsername({
        username: (author! as string).slice(1, author!.length),
        provider: "hive",
      });
    } else {
      setUsername({ username: author as string, provider: "ceramic" });
    }
  }, [author]);

  useEffect(() => {
    const getCeramicProfile = async (didId: string) => {
      const response = await connector.idx.get("basicProfile", didId);
      return response;
    } 

    if (username) {
      if (username.provider === "hive") {
        const query = {
          tag: username.username,
          limit: 10,
        };

        client.database.getDiscussions("blog", query).then((response) => {
          setPosts(response);
        });

        client.database
          .getAccounts([username.username])
          .then((response: any) => {
            if (response[0]) {
              setUserData(
                JSON.parse(response[0].posting_json_metadata).profile
              );
            }
          });
      } else if (username.username) {
        getCeramicProfile(username.username).then((profile: any) => {
          if (profile) {
            setUserData(profile.profile ? profile.profile : {
              about: profile.description || null,
              name: profile.name || null,
              profile_image: profile.image || null,
              cover_image: profile.background || null,
              website: profile.url || null,
              location: profile.homeLocation || null,
            })
          }
        });

        getUserPosts(username.username).then(response => {
          console.log(response);
        })
      }
    }
  }, [username]);

  return (
    <div className="flex flex-col text-white my-10 mx-2 sm:mx-10">
      <ProfileCard userData={userData} username={username} author={(author as string)} />
      <div className="text-center">
        <h1 className="my-3 font-bold text-xl">{t("recent")}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full my-4">
          {posts.map((post) => (
            <NewsPost key={post.permlink} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default User;
