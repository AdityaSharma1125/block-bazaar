import { Link, NavLink } from "react-router-dom";
import { useWallet } from "../lib/wallet";

export default function Navbar() {
  const { account, connect } = useWallet();
  const link = ({ isActive }: { isActive: boolean }) =>
    isActive ? "text-white" : "text-neutral-400 hover:text-white";
  return (
    <header className="flex items-center justify-between px-6 md:px-12 py-5">
      <Link to="/" className="font-display text-xl text-[#e930c9]">Block Bazaar</Link>
      <nav className="flex gap-8 font-display text-lg">
        <NavLink to="/" end className={link}>Home</NavLink>
        <NavLink to="/explore" className={link}>Explore</NavLink>
        <NavLink to="/create" className={link}>Create</NavLink>
        <NavLink to="/about" className={link}>About</NavLink>
      </nav>
      <button onClick={connect} className="rounded-lg bg-[#e930c9] px-4 py-2 text-sm font-semibold text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">
        {account ? account.slice(0, 6) + "..." + account.slice(-4) : "Connect wallet"}
      </button>
    </header>
  );
}
