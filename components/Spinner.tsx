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
          setStatus(response.data);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remaining]);

  useEffect(() => {
    if (status) {
      if (status.status.includes('pfp')) {
        setRefresh('pfp');
      } else {
        setRefresh('inventory');
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
        size={70}
      >
        {({ remainingTime }) => {
          setRemaining(remainingTime!);
          return <h1>{remainingTime}</h1>;
        }}
      </CountdownCircleTimer>
    </div>
  );
};
