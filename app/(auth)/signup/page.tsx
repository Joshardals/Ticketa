import { SignupForm } from "@/components/form/SignupForm";

export default function SignupPage() {
  return (
    <main className="px-5 maxCenter contentCenter w-full mt-[4rem] mb-5">
      <div className="mb-8 text-center">
        <h2 className="text-xl max-md:text-lg font-bold">Create an Account</h2>
        <p className="text-pretty">Join Ticketa and start exploring events!</p>
      </div>
      <SignupForm />
    </main>
  );
}
