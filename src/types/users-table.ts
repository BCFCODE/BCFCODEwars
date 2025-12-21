import { z } from 'zod';
import { schema } from '../app/dashboard/_leaderboard/schemas/usersTableSchema';

export type UsersTableData = z.infer<typeof schema>;
