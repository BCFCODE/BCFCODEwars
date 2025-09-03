import { z } from 'zod';
import { schema } from '../schemas/usersTableSchema';

export type UsersTableCells = z.infer<typeof schema>;
