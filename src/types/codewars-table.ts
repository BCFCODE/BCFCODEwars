import { z } from 'zod';
import { schema } from '../app/dashboard/leaderboard/schemas/usersTableSchema';

export type CodewarsTableData = z.infer<typeof schema>;
