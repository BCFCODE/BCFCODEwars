import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {}

export default function Layout({ children }: Props) {
  return <div className='my-auto px-10'>{children}</div>;
}
