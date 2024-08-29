"use client";
import { AuthValidationType } from "@/typings/form";
import {
  ButtonInput,
  FormInput,
  SelectInput,
} from "@/components/form/FormInput";
import { Form } from "@/components/ui/form";
import Link from "next/link";
import { SignUpValidation } from "@/lib/validations/form";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupUser } from "@/lib/actions/auth.action";

export function SignupForm() {
  const [error, setError] = useState<string | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<AuthValidationType>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      fullname: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: AuthValidationType) => {
    try {
      setLoading(true); // Set the loading state to be true
      setError(null); // Clear previous errors

      const result = await signupUser({
        fullname: values.fullname,
        username: values.username,
        email: values.email,
        password: values.password,
      });

      if (!result.success) {
        setError(result.msg);
        return;
      }

      alert("User created successfully");
      router.push("/home");
    } catch (error: any) {
      console.log(`Error signing up: ${error.message}`);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-sm:w-full sm:w-96"
        autoComplete="off"
      >
        <FormInput
          form={form}
          name="fullname"
          type="text"
          placeholder="Fullname"
          loading={loading}
        />
        <FormInput
          form={form}
          name="username"
          type="text"
          placeholder="Username"
          loading={loading}
        />
        <FormInput
          form={form}
          name="email"
          type="text"
          placeholder="Email"
          loading={loading}
        />

        <FormInput
          form={form}
          name="password"
          type="password"
          placeholder="Password"
          loading={loading}
        />

        <FormInput
          form={form}
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          loading={loading}
        />

        {error && <p className="text-deepRed text-xs font-bold">{error}</p>}

        <ButtonInput loading={loading} label="Sign Up" />
        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link href="/" className="text-deepRed font-semibold">
            Log in here
          </Link>
        </p>
      </form>
    </Form>
  );
}
