import React, { useEffect, useState } from 'react';

import axios from 'axios';

export const NewsScreen = () => {
  const [feed, setFeed] = useState<any>(null);
  const [wantedPFP, setWantedPFP] = useState('');
  const [pfp, setPfp] = useState(null);

  useEffect(() => {
    axios.get('https://token.dlux.io/feed').then(({ data }) => {
      setFeed(data.feed);
    });
  }, []);

  return (
    <div className="mx-10 text-white grid grid-cols-1 sm:grid-cols-4 gap-4">
      {feed &&
        Object.keys(feed).map((key: string) => {
          const name = feed[key].split(' ')[0].split('|')[0];
          const restOfFeed = feed[key].substr(feed[key].indexOf(' ') + 1);
          return (
            <div
              key={key}
              className="bg-gray-600 p-2 rounded-xl border-2 border-gray-800 flex"
            >
              <div>
                <a
                  href={`https://dlux.io/${name}`}
                  className="text-blue-500 cursor-pointer"
                  target="_blank"
                  rel="noreferrer"
                >
                  {name}
                </a>
                <h1 className="cursor-pointer whitespace-normal">
                  {restOfFeed}
                </h1>
              </div>
            </div>
          );
        })}
    </div>
  );
};
