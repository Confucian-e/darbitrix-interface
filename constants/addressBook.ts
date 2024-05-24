import { Address } from "viem";

const Arbitrage: Address = "0xa86cD349302816022e216DC7C19B0c9C76a7C6Ae";

const Vault: Address = "0xBA12222222228d8Ba445958a75a0704d566BF2C8";

const Factories = {
  PancakeSwap: "0x02a84c1b3BBD7401a5f7fa98a384EBC70bB5749E",
  SushiSwap: "0xc35DADB65012eC5796536bD9864eD8773aBc74C4",
};

const Routers = {
  PancakeSwap: "0x8cFe327CEc66d1C090Dd72bd0FF11d690C33a2Eb",
  SushiSwap: "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506",
};

const Tokens = {
  TokenA: "0x88762F15D0150aC231AF265737106E0B9e28E584",
  TokenB: "0xb6B9CB46d9821B507e4F9705aD0d010dC8BF0447",
};

const PancakeSwapFactory = Factories.PancakeSwap as Address;
const SushiSwapFactory = Factories.SushiSwap as Address;

const TokenA = Tokens.TokenA as Address;
const TokenB = Tokens.TokenB as Address;

const PancakeSwapRouter = Routers.PancakeSwap as Address;
const SushiSwapRouter = Routers.SushiSwap as Address;

export {
  Arbitrage,
  PancakeSwapFactory,
  PancakeSwapRouter,
  SushiSwapFactory,
  SushiSwapRouter,
  TokenA,
  TokenB,
  Vault,
};
