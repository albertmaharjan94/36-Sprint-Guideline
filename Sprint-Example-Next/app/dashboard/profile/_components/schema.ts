import { registerSchema } from "@/app/(auth)/_components/schema";
import { z } from "zod";

export const updateProfileSchema = z.object({
    email: z.email("Invalid email address").optional(),
    firstName: z.string().min(1, "First name is required").optional(),
    lastName: z.string().min(1, "Last name is required").optional(),
    username: z.string().min(3, "Username must be at least 3 characters long").optional(),
    profileImage: z.instanceof(File).optional(),
});
export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;