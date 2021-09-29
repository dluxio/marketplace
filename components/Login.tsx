import React, { MouseEventHandler, MutableRefObject, useRef } from 'react';

import { useRecoilState } from 'recoil';
import { userState } from '../atoms';

import { ImCross } from 'react-icons/im';

import hive from '@hiveio/hive-js';

type LoginProps = {
  handleClose: MouseEventHandler;
};

export const Login = ({ handleClose }: LoginProps) => {
  const usernameRef: MutableRefObject<any> = useRef(null);

  hive.api.setOptions({ url: 'https://api.deathwing.me/' });
  hive.config.set('address_prefix', 'STM');
  hive.config.set(
    'chain_id',
    'beeab0de00000000000000000000000000000000000000000000000000000000'
  );
  hive.config.set('alternative_api_endpoints', [
    'https://rpc.ecency.com/',
    'https://hived.emre.sh/',
    'https://rpc.ausbit.dev/',
    'https://api.hive.blog/',
  ]);

  const [user, setUser] = useRecoilState(userState);

  const handleSubmit = (e: any) => {
    if (e.key === 'Enter') {
      hive.api.getAccounts(
        [usernameRef.current.value],
        (err: any, result: any) => {
          if (err) throw new Error(err);
          if (result !== []) {
            setUser(result[0]);
            console.log(result[0]);
          } else {
            alert('User not found');
          }
        }
      );
    }
  };

  return (
    <div className="absolute left-0 top-0 w-full flex justify-center items-center h-full bg-gray-700 bg-opacity-75 z-40">
      <button className="m-5 absolute top-0 left-0">
        <ImCross size={25} color="#fff" opacity={100} onClick={handleClose} />
      </button>
      <div>
        <div className="rounded-xl p-5 bg-black">
          <h1 className="text-xl text-center mb-5">Input your username</h1>
          <input
            type="text"
            placeholder="Username"
            ref={usernameRef}
            className="px-4 py-2 rounded-lg border bg-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
            onKeyDown={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};
