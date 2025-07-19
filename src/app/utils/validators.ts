import { z } from "zod";

export const required_string = z.string().trim().min(1, "required");
