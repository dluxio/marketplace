import React, { MouseEventHandler } from 'react';

type TokenSelectionProps = {
  onClick: MouseEventHandler;
};

export const TokenSelection = ({ onClick }: TokenSelectionProps) => {
  return (
    <div>
      <h1>Select token</h1>
    </div>
  );
};
