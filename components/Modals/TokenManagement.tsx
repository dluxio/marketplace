import React from "react";
import { ModalWrapper } from "../Utils/ModalWrapper";

export const TokenManagement = ({ handleClose }: { handleClose: any }) => {
  return (
    <ModalWrapper handleClose={handleClose}>
      <h1>Token management</h1>
    </ModalWrapper>
  );
};
