import React from "react";
import { ModalWrapper } from "../Utils/ModalWrapper";

export const GovModal = ({
  handleClose,
  up = true,
}: {
  handleClose: any;
  up?: boolean;
}) => {
  return (
    <ModalWrapper handleClose={handleClose}>
      <h1>
        {up ? "Lock DLUX for Governance Ops" : "Unlock Governance Tokens"}
      </h1>
    </ModalWrapper>
  );
};
