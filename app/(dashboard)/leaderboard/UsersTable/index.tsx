import useUsersQuery from '@/app/context/hooks/ReactQuery/useUsersQuery';
import CurrentUserProvider from '@/app/context/providers/CurrentUser';
import { AuthenticatedUser } from '@/types/users';
import { TableBody } from '@mui/material';
import React from 'react'
import UserRow from './UserRow';

const UsersTable = () => {
  const { data: allUsers } = useUsersQuery();

  return allUsers?.map((currentUser: AuthenticatedUser) => (
    <CurrentUserProvider key={currentUser.email} context={{ currentUser }}>
      <TableBody>
        <UserRow />
      </TableBody>
    </CurrentUserProvider>
  ));
}

export default UsersTable