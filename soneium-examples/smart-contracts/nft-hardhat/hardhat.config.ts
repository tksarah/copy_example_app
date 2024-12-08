import { vars, type HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const PK = vars.get("PRIVATE_KEY");

const config: HardhatUserConfig = {
  solidity: "0.8.27",
  defaultNetwork: "minato",
  networks: {
    hardhat: {},
    minato: {
      url: "https://rpc.minato.soneium.org",
      accounts: [PK],
    },
  },
  etherscan: {
    apiKey: {
      minato: "NO API KEY",
    },
    customChains: [
      {
        network: "minato",
        chainId: 1946,
        urls: {
          apiURL: "https://soneium-minato.blockscout.com/api",
          browserURL: "https://soneium-minato.blockscout.com",
        },
      },
    ],
  },
};

export default config;
