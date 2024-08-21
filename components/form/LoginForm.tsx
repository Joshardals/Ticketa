"use client";
import { AuthValidationType } from "@/typings/form";
import { ButtonInput, FormInput } from "@/components/form/FormInput";
import { Form } from "@/components/ui/form";
import Link from "next/link";
import { LoginValidation } from "@/lib/validations/form";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

export function LoginForm() {
  const [error, setError] = useState<string | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<AuthValidationType>({
    resolver: zodResolver(LoginValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: AuthValidationType) => {
    try {
      setLoading(true);
      setError(null);
      console.log(values);
    } catch (error: any) {
      console.log(`An unexpected error occured: ${error.message}`);
      setError("An unexpected error occurred. Please try again.");
    } finally {
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

        {error && <p className="text-deepRed text-xs font-bold">{error}</p>}

        <ButtonInput loading={loading} label="Login" />
        <p className="text-sm">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-deepRed font-semibold">
            Sign up here
          </Link>
        </p>
      </form>
    </Form>
  );
}
