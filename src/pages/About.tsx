const features = [
  ["Layer 2 solution", "Runs on Polygon for fast, low-cost transactions with Ethereum security."],
  ["Decentralized storage", "Artwork can live on IPFS so it stays available."],
  ["Smart contracts", "Every sale is handled by a Solidity contract, not a middleman."],
  ["Global marketplace", "Creators and collectors can trade from anywhere."],
];
const team = ["Hemant Rathore", "Ayush Tripathi", "Aditya Sharma", "Anugya Chidar"];

export default function About() {
  return (
    <main className="mx-auto max-w-4xl px-6 pb-20">
      <h1 className="pt-10 text-center text-4xl">About Block Bazaar</h1>
      <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-neutral-300">
        We want artists to own and sell their digital work, and collectors to buy it with confidence.
      </p>
      <section className="mt-14 rounded-lg bg-neutral-900 p-8 text-center">
        <h2 className="text-2xl">Our mission</h2>
        <p className="mt-3 text-neutral-300">
          Make digital art ownership open to everyone by giving creators a simple way to mint and sell, and collectors a verifiable record of what they own.
        </p>
      </section>
      <section className="mt-14">
        <h2 className="mb-6 text-center text-2xl">Why choose Block Bazaar</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {features.map(([t, d]) => (
            <div key={t} className="rounded-lg bg-neutral-900 p-5">
              <h3 className="text-lg">{t}</h3>
              <p className="mt-2 text-sm text-neutral-300">{d}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="mt-14">
        <h2 className="mb-6 text-center text-2xl">Meet the team</h2>
        <ul className="flex flex-wrap justify-center gap-6">
          {team.map((n) => (
            <li key={n} className="w-40 rounded-lg bg-neutral-900 p-5 text-center">
              <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-full bg-neutral-300 font-display text-xl text-black">{n[0]}</div>
              <span className="text-sm">{n}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
