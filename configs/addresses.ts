import { Address } from "viem";

const Arbitrage: Address = "0x2bF555408BEE93d35A233e92462466ba25e4A8F6";

const Factories = {
    QuickSwap: "0x7E0987E5b3a30e3f2828572Bb659A548460a3003",
    SushiSwap: "0x4B480914A1375C93668Aa1369d11B42a9dAdC8e9"
}

const Routers = {
    QuickSwap: "0xC532a74256D3Db42D0Bf7a0400fEFDbad7694008",
    SushiSwap: "0xb26b2de65d07ebb5e54c7f6282424d3be670e1f0"
}

const Tokens = {
    Amazing: "0x4911d2fa3a40B4C2cA978dbED8Bc1dc457dBf5b8",
    Business: "0x4f86Cc7d637F2447a17B1a1A445b2331ACF05731"
}

const QuickSwapFactory = Factories.QuickSwap as Address;
const SushiSwapFactory = Factories.SushiSwap as Address;

const AmazingToken = Tokens.Amazing as Address;
const BusinessToken = Tokens.Business as Address;

export {
    Arbitrage,
    QuickSwapFactory,
    SushiSwapFactory,
    AmazingToken,
    BusinessToken
}