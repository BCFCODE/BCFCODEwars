import z from "zod";

const schema = z.object({
  email: z.string(),
  isIdle: z.boolean(),
});

export default schema;
