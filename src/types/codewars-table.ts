import { z } from 'zod';
import { schema } from '../app/dashboard/_leaderboard/schemas/usersTableSchema';

export type CodewarsTableData = z.infer<typeof schema>;
