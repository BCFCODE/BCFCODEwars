import { z } from 'zod';
import { schema } from '../app/dashboard/leaderboard/schemas/usersTableSchema';

export type UsersTableData = z.infer<typeof schema>;
