import { z } from 'zod';
import { schema } from '../schemas/usersTableSchema';

export type UsersTableData = z.infer<typeof schema>;
