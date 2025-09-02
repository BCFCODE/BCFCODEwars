import { z } from 'zod';
import { schema } from '../../schemas/usersTableSchema';

export type UsersTable = z.infer<typeof schema>;
