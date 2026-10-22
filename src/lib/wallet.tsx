import { createContext, useContext, useState, ReactNode } from "react";
import { BrowserProvider, Contract } from "ethers";

const ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS as string;
export const ABI = [
  "function mint(string uri) returns (uint256)",
  "function list(uint256 id, uint256 price)",
  "function buy(uint256 id) payable",
  "function cancel(uint256 id)",
  "function totalMinted() view returns (uint256)",
  "function listings(uint256) view returns (address seller, uint256 price, bool active)",
  "function tokenURI(uint256) view returns (string)",
];

type Ctx = {
  account: string;
  connect: () => Promise<void>;
  contract: (write: boolean) => Promise<Contract>;
};
const WalletCtx = createContext<Ctx>(null as any);
export const useWallet = () => useContext(WalletCtx);

export const toUrl = (u: string) => (u || "").replace("ipfs://", "https://ipfs.io/ipfs/");

export function WalletProvider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState("");
  const eth = () => (window as any).ethereum;

  const connect = async () => {
    if (!eth()) return alert("Install MetaMask to connect a wallet.");
    const [a] = await eth().request({ method: "eth_requestAccounts" });
    setAccount(a);
  };

  const contract = async (write: boolean) => {
    if (!eth()) throw new Error("No wallet found. Install MetaMask.");
    if (!ADDRESS) throw new Error("Set VITE_CONTRACT_ADDRESS in .env");
    const provider = new BrowserProvider(eth());
    return new Contract(ADDRESS, ABI, write ? await provider.getSigner() : provider);
  };

  return <WalletCtx.Provider value={{ account, connect, contract }}>{children}</WalletCtx.Provider>;
}
