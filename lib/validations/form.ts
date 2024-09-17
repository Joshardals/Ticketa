import * as z from "zod";
import { AuthValidationType, CategoryValidationType } from "@/typings/form";

// Form Validation for Login form.
export const LoginValidation: z.ZodType<AuthValidationType> = z.object({
  email: z.string().email(), // Validates that the email is a valid email address format.
  password: z.string().min(1, "Required field").max(20), // Ensures password is between 1 and 20 characters long.
});

// Form Validation for Sign Up Form.
export const SignUpValidation: z.ZodType<AuthValidationType> = z
  .object({
    fullname: z
      .string()
      .min(3, "Fullname must be at least 3 characters long") // Validates that fullname is at least 3 characters.
      .max(200, "Fullname cannot exceed 200 characters"), // Validates that fullname does not exceed 200 characters.
    username: z
      .string()
      .min(3, "Username must be at least 3 characters long") // Validates that username is at least 3 characters.
      .max(200, "Username cannot exceed 200 characters"), // Validates that username does not exceed 200 characters.
    email: z.string().email("Invalid email address"), // Validates that email is in correct format.
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long") // Validates that password is at least 8 characters.
      .max(20, "Password cannot exceed 20 characters"), // Validates that password does not exceed 20 characters.
    confirmPassword: z.string(), // Validates that confirmPassword is a string (to be checked against password).
  })
  .refine((data) => data.password === data.confirmPassword, {
    // Custom validation to ensure passwords match.
    path: ["confirmPassword"], // Sets the path of the error to the confirmPassword field.
    message: "Passwords do not match!", // Custom error message if passwords do not match.
  });
