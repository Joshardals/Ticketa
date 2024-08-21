import { LoginForm } from "@/components/form/LoginForm";

export default function HomePage() {
  return (
    <main>
      <header className="p-5 maxCenter fixed left-0 right-0 top-0">
        <h1 className="text-2xl font-extrabold">
          Ticketa<span className=" text-deepRed">.</span>
        </h1>
      </header>

      <section className="px-5 maxCenter contentCenter w-full">
        <div className="mb-8 text-center">
          <h2 className="text-xl max-md:text-lg font-bold">
            Welcome to Ticketa
          </h2>
          <p className="text-pretty">
            Your gateway to student events—log in to browse and manage your
            tickets.
          </p>
        </div>
        <LoginForm />
      </section>
    </main>
  );
}
