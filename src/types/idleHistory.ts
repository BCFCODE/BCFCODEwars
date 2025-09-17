// import { z } from "zod";

// // Zod schema for one history entry
// export const IdleHistoryEntrySchema = z.object({
//   elapsedTimeMs: z
//     .number()
//     .int()
//     .nonnegative()
//     .describe("Total session duration in ms"),
//   activeTimeMs: z
//     .number()
//     .int()
//     .nonnegative()
//     .refine((val, ctx) => {
//       if (val > ctx.parent.elapsedTimeMs) {
//         return false;
//       }
//       return true;
//     }, { message: "activeTimeMs cannot be greater than elapsedTimeMs" })
//     .describe("Active time in ms"),
//   timestamp: z
//     .string()
//     .datetime()
//     .describe("ISO 8601 timestamp marking session start/end"),
// });

// // Array schema
// export const IdleHistorySchema = z.array(IdleHistoryEntrySchema);

// // Inferred TypeScript types
// export type IdleHistoryEntry = z.infer<typeof IdleHistoryEntrySchema>;
// export type IdleHistory = z.infer<typeof IdleHistorySchema>;
