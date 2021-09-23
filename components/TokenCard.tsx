import React from 'react';

type TokenCardProps = {
  token: any;
};

export const TokenCard = ({ token }: TokenCardProps) => {
  return <div>{token[0].set}</div>;
};
