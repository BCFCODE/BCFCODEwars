'use client';

import { SelectContent, SelectItem } from '@/components/ui/select';
import { baseUrl } from '@/lib/constants';
import Link from 'next/link';

export default function TableTabs() {
  const url = {
    users: `${baseUrl}/dashboard/leaderboard/users`,
    codewars: `${baseUrl}/dashboard/leaderboard/codewars`
  };

  return (
    <SelectContent>
      <Link href={url.users}>
        <SelectItem value='users'>Users</SelectItem>
      </Link>
      <Link href={url.codewars}>
        <SelectItem value='codewars'>Codewars</SelectItem>
      </Link>
    </SelectContent>
  );
}
