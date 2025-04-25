import z from "zod";

const reconnectSchema = z.object({
  name: z.string(),
  username: z.string(),
  email: z.string().email(),
  clan: z.string(),
});

export type ReconnectCodewars = z.infer<typeof reconnectSchema>;

export default reconnectSchema;
