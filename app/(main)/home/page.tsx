import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MainHeader } from "@/components/shared/MainHeader";

export default function Homepage() {
  return (
    <main className="text-softWhite overflow-hidden">
      <section className="h-screen bg-[url('/assets/party.jpg')] bg-cover bg-center relative">
        <div className="absolute bg-darkCharcoal inset-0 opacity-60" />
        <MainHeader />

        <div className="absolute left-0 right-0 px-5 maxCenter flex flex-col justify-center items-center h-full text-center">
          <h1 className="capitalize text-4xl max-sm:text-3xl font-bold">
            Join the festival fun
          </h1>
          <p className="text-pretty mb-4">
            Experience the thrill and excitement of our upcoming events.
          </p>
          <Link href="/events">
            <Button variant={"home"}>Explore Events</Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
