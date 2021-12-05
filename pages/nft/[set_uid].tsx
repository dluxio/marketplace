import React from "react";
import { useRouter } from "next/router";

const NFTManagement = () => {
  const router = useRouter();
  const { set_uid } = router.query;
  const uid = (set_uid as string)!.split(":")[1];
  const set = (set_uid as string)!.split(":")[0];
  return (
    <div className="w-full flex justify-center text-white text-xl">
      <h1>
        set: {set} / uid: {uid}
      </h1>
    </div>
  );
};

export default NFTManagement;
