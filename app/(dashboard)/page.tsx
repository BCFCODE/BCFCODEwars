import * as React from 'react';
import Typography from '@mui/material/Typography';
import { auth } from '../../auth';

export default async function HomePage() {
  const session = await auth();

  return (
    <Typography>
      Welcome to BCFCODEwars, {session?.user?.name || 'User'}!
    </Typography>
  );
}
