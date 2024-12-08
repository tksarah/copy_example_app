"use client";
import { useEffect, useState } from "react";
import { type Address } from "viem";
import {
  useAccount,
  useBalance,
  useChainId,
  usePublicClient,
  useReadContract,
  useSwitchChain,
  useWalletClient,
} from "wagmi";
import { soneiumMinato } from "viem/chains";
import NFT_ABI from "../modules/wagmi/abi/DemoNFT";
import styles from "./page.module.css";

// Todo: Update to the correct address for the deployed contract
const nftContractAddress = "0x509020Ac6410142F3146f0CdFF25701010073b7f";
const faucetDocs = "https://docs.soneium.org/docs/builders/tools/faucets";

export default function Home(): JSX.Element {
  const [txDetails, setTxDetails] = useState<string>("");
  const { address: walletAddress } = useAccount();

  const { switchChain } = useSwitchChain();
  const connectedId = useChainId();
  const chainId = soneiumMinato.id;
  const isConnectedToMinato = connectedId === soneiumMinato.id;

  const { data: walletClient } = useWalletClient({
    chainId,
    account: walletAddress,
  });

  const publicClient = usePublicClient({
    chainId,
  });

  const [isPending, setIsPending] = useState(false);
  const { data: bal } = useBalance({
    address: walletAddress,
    chainId,
  });
  const isBalanceZero = bal?.value.toString() === "0";

  const { data, isFetched, refetch } = useReadContract({
    abi: NFT_ABI,
    address: nftContractAddress,
    functionName: "balanceOf",
    args: [walletAddress as Address],
  });

  async function mintNft(): Promise<void> {
    if (!walletClient || !publicClient || !walletAddress) return;
    try {
      setIsPending(true);
      setTxDetails("");
      const tx = {
        account: walletAddress as Address,
        address: nftContractAddress as Address,
        abi: NFT_ABI,
        functionName: "safeMint",
        args: [walletAddress],
      } as const;
      const { request } = await publicClient.simulateContract(tx);
      const hash = await walletClient.writeContract(request);
      await publicClient.waitForTransactionReceipt({
        hash,
      });
      setTxDetails(`https://explorer-testnet.soneium.org/tx/${hash}`);
      await refetch();
    } catch (error) {
      console.error(error);
    } finally {
      setIsPending(false);
    }
  }

  function textNftBalances(bal: string): string {
    const balance = Number(bal);
    if (balance > 1) {
      return `You have ${balance} NFTs`;
    } else if (balance === 1) {
      return `You have ${balance} NFT`;
    } else {
      return `You don't own any NFTs yet`;
    }
  }
  useEffect(() => {
    setTxDetails("");
  }, [walletAddress]);

  // Memo: display the page after fetching the NFT balance
  return !isFetched ? (
    <div />
  ) : (
    <div className={styles.container}>
      <div className={styles.rowBalance}>
        {walletAddress && (
          <span>{textNftBalances(data?.toString() || "0")}</span>
        )}
      </div>
      <br />

      <button
        disabled={
          isPending || !walletAddress || isBalanceZero || !isConnectedToMinato
        }
        className={styles.buttonAction}
        onClick={mintNft}
        type="button"
      >
        {isPending ? "Confirming..." : "Mint NFT"}
      </button>

      {txDetails && (
        <div className={styles.txDetails}>
          <span>🎉 Congrats! Your NFT has been minted 🐣 </span>
          <a
            href={txDetails}
            target="_blank"
            rel="noreferrer"
            className={styles.txLink}
          >
            View transaction
          </a>
        </div>
      )}

      {walletAddress && isBalanceZero && (
        <div className={styles.rowChecker}>
          <span className={styles.textError}>
            You don't have enough ETH balance to mint NFT
          </span>
          <a
            href={faucetDocs}
            target="_blank"
            rel="noreferrer"
            className={styles.txLink}
          >
            ETH Faucet
          </a>
        </div>
      )}

      {!isConnectedToMinato && walletAddress && (
        <div className={styles.rowChecker}>
          <span className={styles.textError}>
            Please connect to Soneium Minato
          </span>

          <button
            className={styles.buttonSwitchChain}
            onClick={() => switchChain({ chainId })}
          >
            Switch to Soneium Minato
          </button>
        </div>
      )}
    </div>
  );
}
