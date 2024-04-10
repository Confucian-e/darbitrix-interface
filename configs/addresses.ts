import { Address } from "viem";

const Arbitrage: Address = "0x6b17edf3201e2da11a4009c3dd2baa7e180cf29e";

const Factories = {
  PancakeSwap: "0x02a84c1b3BBD7401a5f7fa98a384EBC70bB5749E",
  SushiSwap: "0xc35DADB65012eC5796536bD9864eD8773aBc74C4",
};

const Routers = {
  PancakeSwap: "0x8cFe327CEc66d1C090Dd72bd0FF11d690C33a2Eb",
  SushiSwap: "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506",
};

const Tokens = {
  Amazing: "0x5E0543f61F94B40c9A5265b5B3a7B35aa8Dc6B49",
  Business: "0x81b58Ae322E933f8238505538A73FE81Ad4f2B1E",
};

const PancakeSwapFactory = Factories.PancakeSwap as Address;
const SushiSwapFactory = Factories.SushiSwap as Address;

const AmazingToken = Tokens.Amazing as Address;
const BusinessToken = Tokens.Business as Address;

const PancakeSwapRouter = Routers.PancakeSwap as Address;
const SushiSwapRouter = Routers.SushiSwap as Address;

export {
  Arbitrage,
  PancakeSwapFactory,
  SushiSwapFactory,
  AmazingToken,
  BusinessToken,
  PancakeSwapRouter,
  SushiSwapRouter,
};
