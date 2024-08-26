import * as z from "zod";
import { AuthValidationType, CategoryValidationType } from "@/typings/form";
import path from "path";

// Form Validation for Login form.
export const LoginValidation: z.ZodType<AuthValidationType> = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Required field").max(20),
});

// Form Validation for Sign Up Form.
export const SignUpValidation: z.ZodType<AuthValidationType> = z
  .object({
    fullname: z
      .string()
      .min(3, "Fullname must be at least 3 characters long")
      .max(200, "Fullname cannot exceed 200 characters"),
    username: z
      .string()
      .min(3, "Username must be at least 3 characters long")
      .max(200, "Username cannot exceed 200 characters"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(20, "Password cannot exceed 20 characters"),
    confirmPassword: z.string(),
    gender: z.string({
      required_error: "Select Your Gender for a Personalized Experience",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"], // Set the path of the error to the confirmPassword field
    message: "Passwords do not match!",
  });

// Form Validation for Category.
// export const CategoryValidationType: z.ZodType<CategoryValidationType> =
//   z.object({
//     category: z.string({
//       required_error: "Select Your Gender for a Personalized Experience",
//     }),
//   });
