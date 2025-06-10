import z from "zod";

const schema = z.object({
  email: z.string(),
  snapshot: z.object({
    isIdle: z.boolean(),
    isPrompted: z.boolean(),
    remainingTimeMs: z.number(),
    elapsedTimeMs: z.number(),
    lastIdleTime: z.coerce.date().nullable(),
    lastActiveTime: z.coerce.date().nullable(),
    idleTimeMs: z.number(),
    activeTimeMs: z.number(),
    totalIdleTimeMs: z.number(),
    totalActiveTimeMs: z.number(),
    presence: z.enum(["active", "prompting", "idle"]),
    timestamp: z.coerce.date(),
  }),
});

export default schema;
