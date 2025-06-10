import z from "zod";

const schema = z.object({
  email: z.string().email(),
  isIdle: z.boolean(),
});

export default schema;
