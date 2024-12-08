// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const NftModule = buildModule("NftModule", (m) => {
  const adminOwner = m.getAccount(0);

  const nft = m.contract("DemoNFT", [adminOwner]);

  return { nft };
});

export default NftModule;
