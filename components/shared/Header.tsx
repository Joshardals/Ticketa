import Link from "next/link";

export function Header() {
  return (
    <header className="p-5 maxCenter fixed left-0 right-0 top-0 bg-softWhite">
      <Link href="/">
        <h1 className="text-2xl font-extrabold">
          Ticketa<span className=" text-deepRed">.</span>
        </h1>
      </Link>
    </header>
  );
}
