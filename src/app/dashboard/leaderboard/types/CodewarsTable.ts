import { z } from 'zod';
import { schema } from '../schemas/usersTableSchema';

export type CodewarsTableData = z.infer<typeof schema>;
