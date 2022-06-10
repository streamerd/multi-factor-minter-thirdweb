import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";
import { Box, Button, Paragraph, Text } from "grommet";
import { useSession, signIn, signOut } from "next-auth/react";
import React from "react";
import styles from "../styles/Theme.module.css";

export default function SignIn() {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();
  const { data: session } = useSession();

  if (session && address) {
    return (
      <div className={styles.bigSpacerTop}>
        <a onClick={() => signOut()} className={styles.secondaryButton}>
          Sign out Discord
        </a>
        |
        <a
          onClick={() => disconnectWallet()}
          className={styles.secondaryButton}
        >
          Disconnect wallet
        </a>
      </div>
    );
  }

  // 2. Connect with Discord (OAuth)
  if (!session) {
    return (
      <div className={`${styles.main}`}>
        <h2 className={styles.noGapBottom}> let's jam </h2>

        <Paragraph margin={"large"}>
          <Text weight={"bolder"} size="xlarge">
            Join our discord and get your Alpha Minter role.
          </Text>
        </Paragraph>

        <button onClick={signIn}>
          <Box
            background={"purple"}
            width="200px"
            height={"80px"}
            pad="xsmall"
            alignSelf="center"
          >
            <Text size="xlarge" color={"white"}>
              Connect Discord
            </Text>
          </Box>
        </button>
      </div>
    );
  }

  // 1. Connect with MetaMask
  if (!address) {
    return (
      <div>
        <Paragraph>

        continue with a wallet.
        </Paragraph>
        {/* <p>Connect your wallet to check eligibility.</p> */}
        <button onClick={connectWithMetamask}>
          <Box background={"orange"} 
          alignSelf="end"
          width="200px" height={"60px"} alignContent="center">
            connect
          </Box>
        </button>
      </div>
    );
  }
}
