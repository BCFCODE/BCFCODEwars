import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {}

export default async function CodewarsConnectLayout({ children }: Props) {
  return <div>{children}</div>;
}
