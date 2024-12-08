import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { sepolia, soneiumMinato } from "viem/chains";

const reownProjectId = process.env.NEXT_PUBLIC_REOWN_PROJECT;

const minato = {
  ...soneiumMinato,
  name: "Soneium Minato",
  // Memo: Download from https://soneium.org/en/brand-kit/
  iconUrl: "/symbol-full-color.svg",
};

export const WAGMI_CONFIG = getDefaultConfig({
  appName: "YOUR_DAPP_NAME",
  projectId: reownProjectId as string,
  chains: [minato, sepolia],
  ssr: true,
});
