import { z } from "zod";

export const permissionSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name cannot exceed 50 characters"),
    description: z
        .string()
        .min(10, "Description must be at least 10 characters")
        .max(200, "Description cannot exceed 200 characters"),
    slug: z
        .string()
        .min(3, "Slug must be at least 3 characters")
        .max(100, "Slug cannot exceed 100 characters")
        .regex(
            /^[a-z]+(?:_[a-z]+)*$/,
            "Slug must follow these rules:\n" +
            "1. Use lowercase letters only (a-z)\n" +
            "2. No numbers or special characters allowed\n" +
            "3. Use underscore (_) as separator\n" +
            "4. Format: resource_action\n" +
            "Examples: user_create, ticket_update, role_assign"
        )
        .transform((val) => val.toLowerCase()),
    resourceId: z.string().min(1, "Resource ID is required"),
});
