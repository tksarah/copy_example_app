"use client";

import { WAGMI_CONFIG } from "@/modules/wagmi/config";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { soneiumMinato } from "viem/chains";
import { WagmiProvider } from "wagmi";

const client = new QueryClient();

export function WalletProvider({
  children,
}: React.PropsWithChildren): JSX.Element {
  return (
    <WagmiProvider config={WAGMI_CONFIG}>
      <QueryClientProvider client={client}>
        <RainbowKitProvider initialChain={soneiumMinato}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
