import Link from "next/link";
export default function Home() {
  return (
    <div>
      <h1>This is landing page.</h1>
      <Link href="/signin">signin</Link>
      <Link href="/map">map</Link>
    </div>
  );
}
