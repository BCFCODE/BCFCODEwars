import { z } from 'zod';
import { schema } from '../../../schemas/usersTableSchema';

export type CodewarsTableCells = z.infer<typeof schema>;
