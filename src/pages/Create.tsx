import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { parseEther } from "ethers";
import { useWallet } from "../lib/wallet";

export default function Create() {
  const { contract, account, connect } = useWallet();
  const nav = useNavigate();
  const [f, setF] = useState({ name: "", description: "", image: "", price: "" });
  const [busy, setBusy] = useState(false);
  const set = (k: string) => (e: any) => setF({ ...f, [k]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!account) return connect();
    setBusy(true);
    try {
      const meta = { name: f.name, description: f.description, image: f.image };
      const uri = "data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(meta))));
      const c = await contract(true);
      await (await c.mint(uri)).wait();
      if (f.price) {
        const id = await c.totalMinted();
        await (await c.list(id, parseEther(f.price))).wait();
      }
      nav("/");
    } catch (err: any) {
      alert(err.shortMessage || err.message);
    }
    setBusy(false);
  };

  const input = "w-full rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#e930c9]";
  return (
    <main className="mx-auto max-w-xl px-6 pb-20">
      <h1 className="py-10 text-center text-4xl">Create an artwork</h1>
      <form onSubmit={submit} className="space-y-5">
        <label className="block">Title<input required className={input} value={f.name} onChange={set("name")} /></label>
        <label className="block">Description<textarea className={input} rows={3} value={f.description} onChange={set("description")} /></label>
        <label className="block">Image URL (https:// or ipfs://)<input required className={input} value={f.image} onChange={set("image")} /></label>
        <label className="block">Sale price in ETH (leave empty to keep it unlisted)<input className={input} inputMode="decimal" value={f.price} onChange={set("price")} /></label>
        <button disabled={busy} className="w-full rounded-lg bg-[#e930c9] py-3 font-display text-xl text-black disabled:opacity-50">
          {!account ? "Connect wallet" : busy ? "Waiting for wallet..." : "Mint artwork"}
        </button>
      </form>
    </main>
  );
}
