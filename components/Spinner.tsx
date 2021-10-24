import React, { useState, useEffect } from 'react';

import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { spinnerColors } from '../constants';

import axios from 'axios';
import { refreshState } from '../atoms';
import { useRecoilState } from 'recoil';

export const Spinner = ({
  time,
  broadcast,
}: {
  time: number;
  broadcast: any;
}) => {
  const [remaining, setRemaining] = useState(time);
  const [status, setStatus] = useState<any>();
  const [_refresh, setRefresh] = useRecoilState(refreshState);

  useEffect(() => {
    if (remaining === 0) {
      axios
        .get(`https://token.dlux.io/api/status/${broadcast.result.id}`)
        .then((response) => {
          console.log(response.data);
          setStatus(response.data);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remaining]);

  useEffect(() => {
    console.log(status);
    if (status) {
      switch (status) {
        case status.includes("can't afford to buy"):
          break;
        case status.includes('pfp'):
          setRefresh('pfp');
          break;
        case status.includes('Redeemed a dlux Mint Token'):
          setRefresh('inventory');
          break;
        default:
          break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <div
      className={remaining === 0 && broadcast.success ? 'hidden my-2' : 'my-2'}
    >
      <CountdownCircleTimer
        isPlaying
        duration={time}
        colors={spinnerColors}
        size={65}
      >
        {({ remainingTime }) => {
          setRemaining(remainingTime!);
          return <h1>{remainingTime}</h1>;
        }}
      </CountdownCircleTimer>
    </div>
  );
};
