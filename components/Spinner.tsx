import React, { useState } from 'react';

import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { spinnerColors } from '../constants';

export const Spinner = ({ time }: { time: number }) => {
  const [remaining, setRemaining] = useState(time);
  return (
    <div className={remaining === 0 ? 'hidden my-2' : 'my-2'}>
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
