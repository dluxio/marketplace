import React, { useState, useEffect } from 'react';

import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { spinnerColors } from '../constants';

export const Spinner = ({
  time,
  broadcast,
}: {
  time: number;
  broadcast: any;
}) => {
  const [remaining, setRemaining] = useState(time);
  const [status, setStatus] = useState<{ success: boolean }>();

  useEffect(() => {
    console.log(remaining, broadcast);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remaining]);

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
