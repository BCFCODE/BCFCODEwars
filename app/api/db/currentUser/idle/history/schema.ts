import z from "zod";

const schema = z.object({
  email: z.string(),
  snapshot: z.object({
    isIdle: z.boolean(),
    elapsedTimeMs: z.number(),
    lastIdleTime: z.coerce.date().nullable(),
    lastActiveTime: z.coerce.date().nullable(),
    activeTimeMs: z.number(),
    totalActiveTimeMs: z.number(),
    // remainingTimeMs: z.number(),
    // idleTimeMs: z.number(),
    // totalIdleTimeMs: z.number(),
    // presence: z.enum(["active", "prompting", "idle"]),
    isPrompted: z.boolean(),
    timestamp: z.coerce.date(),
  }),
});

export default schema;
