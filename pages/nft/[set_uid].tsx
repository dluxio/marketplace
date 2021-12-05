import React from "react";
import { useRouter } from "next/router";

const NFTManagement = () => {
  const router = useRouter();
  const { set_uid } = router.query;
  return (
    <div className="w-full flex justify-center text-white text-xl">
      <h1>{set_uid}</h1>
    </div>
  );
};

export default NFTManagement;
