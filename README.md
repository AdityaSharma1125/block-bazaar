# Block Bazaar

An NFT art marketplace where artists mint their work and collectors buy it with a crypto wallet.

## Stack
- Solidity, OpenZeppelin ERC-721, Hardhat
- React, TypeScript, Vite, Tailwind CSS
- ethers v6, MetaMask

## Getting started
    npm install
    cp .env.example .env
    npm run node
    npm run deploy:local
    npm run dev

Paste the printed contract address into `.env` as `VITE_CONTRACT_ADDRESS`, then restart `npm run dev` and open http://localhost:8080.

In MetaMask, add the network `http://127.0.0.1:8545` (chain id 31337) and import one of the private keys printed by `npm run node`.

## Deploying to a testnet
Set `AMOY_RPC` and `PRIVATE_KEY` in `.env`, then run `npm run deploy:amoy`.

## How it works
- `mint` creates a token whose metadata (title, description, image) is stored in its token URI.
- `list` moves the token into the contract and sets a price.
- `buy` pays the seller, sends 2.5% to the marketplace owner and transfers the token.
- `cancel` returns an unsold token to its seller.
