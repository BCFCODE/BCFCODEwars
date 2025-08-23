import React, { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {}

const LeaderboardLayout = ({ children }: Props) => {
  return <div className='flex flex-1 flex-col'>{children}</div>;
};

export default LeaderboardLayout;
