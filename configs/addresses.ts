import { Address } from "viem";

const Arbitrage: Address = "0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84";

const Factories = {
    QuickSwap: "0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32",
    SushiSwap: "0xc35DADB65012eC5796536bD9864eD8773aBc74C4"
}

const Tokens = {
    Amazing: "0xEB773bc017176dbc1Bd0D77d07E196cb26E8DC4c",
    Business: "0xEc0cF6F4c63bB47d6C7888f204703DDB859E9223"
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