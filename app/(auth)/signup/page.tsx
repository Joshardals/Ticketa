import { SignupForm } from "@/components/form/SignupForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | Ticketa",
  description:
    "Create your Ticketa account and start exploring student events—sign up now to browse, buy, and manage your tickets effortlessly.",
};

export default function SignupPage() {
  return (
    <main className="px-5 maxCenter contentCenter w-full mt-[3.5rem]">
      <div className="mb-8 text-center">
        <h2 className="text-xl max-md:text-lg font-bold">Create an Account</h2>
        <p className="text-pretty">Join Ticketa and start exploring events!</p>
      </div>
      <SignupForm />
    </main>
  );
}
