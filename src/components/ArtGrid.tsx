import { useEffect, useState } from "react";
import { formatEther, parseEther } from "ethers";
import { useWallet, toUrl } from "../lib/wallet";

type Item = { id: number; name: string; image: string; price: string; forSale: boolean };

export default function ArtGrid({ limit }: { limit?: number }) {
  const { contract, account } = useWallet();
  const [items, setItems] = useState<Item[]>([]);
  const [status, setStatus] = useState("Loading artworks...");

  const load = async () => {
    try {
      const c = await contract(false);
      const total = Number(await c.totalMinted());
      const out: Item[] = [];
      for (let id = total; id >= 1 && out.length < (limit || total); id--) {
        const [l, uri] = await Promise.all([c.listings(id), c.tokenURI(id)]);
        const meta = await (await fetch(toUrl(uri))).json();
        out.push({ id, name: meta.name, image: toUrl(meta.image), price: formatEther(l.price), forSale: l.active });
      }
      setItems(out);
      setStatus(total ? "" : "Nothing minted yet. Create the first artwork.");
    } catch (e: any) {
      setStatus(e.message);
    }
  };

  useEffect(() => { load(); }, []);

  const buy = async (it: Item) => {
    try {
      const c = await contract(true);
      await (await c.buy(it.id, { value: parseEther(it.price) })).wait();
      load();
    } catch (e: any) {
      alert(e.shortMessage || e.message);
    }
  };

  return (
    <>
      {status && <p className="text-center text-neutral-400">{status}</p>}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <article key={it.id} className="rounded-lg bg-[#66195a]/40 p-3">
            <img src={it.image} alt={it.name} className="aspect-square w-full rounded bg-[#66195a] object-cover" />
            <div className="flex items-center justify-between px-1 pt-3">
              <h3 className="text-lg">{it.name}</h3>
              {it.forSale && <span className="text-sm text-neutral-300">{it.price} ETH</span>}
            </div>
            {it.forSale ? (
              <button disabled={!account} onClick={() => buy(it)} className="mt-3 w-full rounded-lg bg-[#e930c9] py-2 font-display text-lg text-black disabled:opacity-50">
                {account ? "Buy now" : "Connect wallet to buy"}
              </button>
            ) : (
              <p className="mt-3 text-center text-sm text-neutral-400">Not for sale</p>
            )}
          </article>
        ))}
      </div>
    </>
  );
}
