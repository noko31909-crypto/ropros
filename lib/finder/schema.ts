import { z } from "zod";

/** Matches the ropros project JSON schema (snake_case, as stored). */
export const ProjectSchema = z.object({
  project_id: z.string().regex(/^[a-z0-9-]{3,64}$/),
  title: z.string().min(1).max(120),
  microcontroller: z.string().min(1).max(80),
  components_required: z.array(z.string().min(1).max(80)).min(1).max(40),
  wiring_summary: z.string().max(4000),
  code_snippet: z.string().max(20000),
});
export type ProjectRecord = z.infer<typeof ProjectSchema>;

/** Request body for POST /api/finder. Strict: unknown keys are rejected. */
export const FinderRequestSchema = z.object({
  parts: z.array(z.string().trim().min(1).max(80)).min(1).max(60),
}).strict();
export type FinderRequest = z.infer<typeof FinderRequestSchema>;
