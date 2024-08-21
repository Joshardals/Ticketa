import { LoginForm } from "@/components/form/LoginForm";

export default function LoginPage() {
  return (
    <main className="px-5 maxCenter contentCenter w-full">
      <div className="mb-8 text-center">
        <h2 className="text-xl max-md:text-lg font-bold">Welcome to Ticketa</h2>
        <p className="text-pretty">
          Your gateway to student events—log in to browse and manage your
          tickets.
        </p>
      </div>
      <LoginForm />
    </main>
  );
}
