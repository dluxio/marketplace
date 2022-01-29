import { Formik } from 'formik';
import React, { MouseEventHandler, useEffect, useState } from 'react';
import { ImCross } from 'react-icons/im';
import { FormInput } from '../Utils/FormInput';

import { useRecoilValue, useRecoilState } from 'recoil';
import { prefixState, userState, broadcastState } from '../../atoms';

import { FTAirdrop } from '../../utils';
import { ModalWrapper } from "../Utils/ModalWrapper";

export const Airdrop = ({
  handleClose,
  set,
}: {
  handleClose: Function;
  set: string;
}) => {
  const prefix: string = useRecoilValue(prefixState);
  const user: any = useRecoilValue(userState);
  const [broadcasts, setBroadcasts] = useRecoilState<any>(broadcastState);
  const [airdropData, setAirdropData] =
    useState<{ to: string[]; set: string }>();

  useEffect(() => {
    if (airdropData) {
      FTAirdrop(user.name, airdropData, prefix).then((response: any) => {
        if (response) {
          if (response.success) {
            setBroadcasts((prevState: any) => [...prevState, response]);
          }
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [airdropData]);

  return (
    <ModalWrapper handleClose={handleClose}>
      <h1 className="text-center text-white text-2xl">Airdrop NFT</h1>
      <Formik
        initialValues={{ to: "" }}
        validate={({ to }) => {
          const errors: any = {};
          if (!to) {
            errors.to = "Required";
          }
          return errors;
        }}
        onSubmit={({ to }, { setSubmitting }) => {
          setAirdropData({ to: to.split(" "), set });
          setSubmitting(false);
          handleClose();
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col justify-center gap-5 text-white">
              <FormInput
                name="to"
                errors={errors.to}
                handleBlur={handleBlur}
                handleChange={handleChange}
                touched={touched.to}
                value={values.to}
              />
              <p>example - &quot;name another_name&quot;</p>
              <button
                type="submit"
                className="rounded-lg border border-white py-1 w-2/3 px-2 bg-gray-500 focus:ring-4 mx-auto focus:outline-none focus:ring-gray-700"
              >
                Airdrop
              </button>
            </div>
          </form>
        )}
      </Formik>
    </ModalWrapper>
  );
};
