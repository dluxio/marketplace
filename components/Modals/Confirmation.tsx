import { useTranslation } from "next-export-i18n";
import React, { MouseEventHandler } from "react";
import { ImCross } from "react-icons/im";
import { ModalWrapper } from "../Utils/ModalWrapper";

export const Confirmation = ({
  handleClose,
  handleContinue,
}: {
  handleClose: MouseEventHandler;
  handleContinue: MouseEventHandler;
}) => {
  const { t } = useTranslation();

  return (
    <ModalWrapper handleClose={handleClose}>
      <div className="m-8">
        <h1 className="text-center text-white text-2xl mb-3">
          {t("confirmation")}
        </h1>
        <div className="flex justify-between w-full">
          <button
            onClick={handleContinue}
            className="px-4 py-2 mx-2 rounded-lg border-2 text-white bg-transparent border-white focus:outline-none focus:ring-2 focus:ring-gray-700"
          >
            {t("continue")}
          </button>
          <button
            onClick={handleClose}
            className="px-4 py-2 mx-2 rounded-lg border-2 text-gray-500 bg-transparent border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-700"
          >
            {t("cancel")}
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};
