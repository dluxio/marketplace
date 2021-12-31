import React, { useEffect, useState, useMemo } from "react";
import Masonary from "react-masonry-css";
import { isMobile } from "react-device-detect";
import { useRouter } from "next/router";
import { ceramicApi, hiveApi, placeHolder } from "../constants";
import { Client } from "@hiveio/dhive";
import { useTranslation } from "next-export-i18n";
import { useHiveKeychainCeramic } from "spk-auth-react";
import { getUserPosts } from "../utils";
import { ProfileCard } from "../components/Card/ProfileCard";
import { PostCard } from "../components/Card/PostCard";

const User = () => {
  const client = new Client(hiveApi);
  const connector = useHiveKeychainCeramic(ceramicApi);
  const router = useRouter();
  const { author } = router.query;
  const [username, setUsername] = useState({ username: "", provider: "" });
  const [posts, setPosts] = useState<any[]>([]);
  const [userData, setUserData] = useState<any>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (author) {
      const firstChar = (author! as string).slice(0, 1);

      if (firstChar === "@") {
        setUsername({
          username: (author! as string).slice(1, author!.length),
          provider: "hive",
        });
      } else if (firstChar === "d") {
        setUsername({ username: author as string, provider: "ceramic" });
      } else {
        router.push("/404");
      }
    }
  }, [author]);

  useEffect(() => {
    const getCeramicProfile = async (didId: string) => {
      const response = await connector.idx.get("basicProfile", didId);
      return response;
    };

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
            setUserData(
              profile.profile
                ? profile.profile
                : {
                    about: profile.description || null,
                    name: profile.name || null,
                    profile_image: profile.image || null,
                    cover_image: profile.background || null,
                    website: profile.url || null,
                    location: profile.homeLocation || null,
                  }
            );
          }
        });

        getUserPosts(username.username).then((response) => {
          setPosts(response);
        });
      }
    }
  }, [username]);

  return (
    <div className="flex flex-col text-white my-10 mx-2 sm:mx-10">
      <ProfileCard
        userData={userData}
        username={username}
        author={author as string}
      />
      <div className="text-center">
        <h1 className="my-3 font-bold text-xl">{t("recent")}</h1>
        <Masonary
          breakpointCols={isMobile ? 1 : 2}
          className="masonry-grid sm:mx-4"
          columnClassName="masonry-grid_column"
        >
          {posts.map((post) => {
            const metadata = post.json_metadata
              ? JSON.parse(post.json_metadata)
              : null;
            console.log(post);
            return post.active_votes ? (
              <PostCard
                key={post.permlink}
                author={post.author}
                permlink={post.permlink}
                speak={false}
                title={post.title}
                votes={post.active_votes}
                images={metadata.image}
                playlist={[]}
                pfp={
                  userData?.profile_image ? userData.profile_image : placeHolder
                }
              />
            ) : (
              <PostCard
                key={post.permlink}
                author={
                  post.content?.debug_metadata?.auth_id
                    ? post.content.debug_metadata.auth_id.split(":")[1]
                    : "unknown"
                }
                permlink={post.permlink}
                pfp={placeHolder}
                speak={false}
                title={post.content.title ? post.content.title : ""}
                votes={[]}
                images={[]}
                playlist={[]}
              />
            );
          })}
        </Masonary>
      </div>
    </div>
  );
};

export default User;
