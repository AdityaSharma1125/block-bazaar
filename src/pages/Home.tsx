import { Link } from "react-router-dom";
import ArtGrid from "../components/ArtGrid";

const artists = ["Hemant Rathore", "Ayush Tripathi", "Aditya Sharma", "Anugya Chidar"];

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-6 pb-20">
      <section className="py-16 text-center">
        <h1 className="text-5xl text-[#e930c9] md:text-7xl">Block Bazaar</h1>
        <p className="mt-2 font-display text-3xl md:text-5xl">Extraordinary NFT Art</p>
        <div className="mt-8 flex justify-center gap-4">
          <Link to="/explore" className="rounded-lg bg-[#e930c9] px-6 py-3 font-display text-xl text-black">Start exploring</Link>
          <Link to="/create" className="rounded-lg border border-neutral-500 px-6 py-3 font-display text-xl hover:border-white">Create art</Link>
        </div>
      </section>
      <section className="py-12">
        <h2 className="mb-8 text-center text-2xl text-[#e930c9]">Featured artists</h2>
        <ul className="flex flex-wrap justify-center gap-10">
          {artists.map((a) => (
            <li key={a} className="text-center">
              <div className="mx-auto mb-3 grid h-24 w-24 place-items-center rounded-full bg-[#e930c9] font-display text-3xl text-black">{a[0]}</div>
              <span className="rounded bg-neutral-800 px-3 py-1 text-sm">{a}</span>
            </li>
          ))}
        </ul>
      </section>
      <section className="py-12">
        <h2 className="mb-8 text-center text-2xl text-[#e930c9]">Latest artworks</h2>
        <ArtGrid limit={6} />
      </section>
    </main>
  );
}
