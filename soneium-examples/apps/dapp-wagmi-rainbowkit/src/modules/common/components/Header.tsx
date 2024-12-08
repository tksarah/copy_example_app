import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "./Header.module.css";

export function Header(): JSX.Element {
  return (
    <header className={styles.wrapper}>
      <ConnectButton />
    </header>
  );
}
