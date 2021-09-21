import React, { useState, useEffect } from 'react';

type CountdownProps = {
  deadline: string;
};

export const Countdown = ({ deadline }: CountdownProps) => {
  const [{ days, hours, minutes, seconds }, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const getTimeUntil = (count: string) => {
    const time = Date.parse(count) - Date.now();
    if (time < 0) {
      setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    } else {
      const seconds = Math.floor((time / 1000) % 60);
      const minutes = Math.floor((time / 1000 / 60) % 60);
      const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
      const days = Math.floor(time / (1000 * 60 * 60 * 24));
      setTime({ days, hours, minutes, seconds });
    }
  };

  useEffect(() => {
    getTimeUntil(deadline);
    setInterval(() => getTimeUntil(deadline), 1000);
  }, [deadline]);

  return (
    <div>
      {days}:{hours}:{minutes}:{seconds}
    </div>
  );
};
