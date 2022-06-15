import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";
import { Box, Button, Paragraph, Text } from "grommet";
import { useSession, signIn, signOut } from "next-auth/react";
import React from "react";
import styles from "../styles/Theme.module.css";
import Airdrop from "./Airdrop";

export default function SignIn() {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();
  const { data: session } = useSession();

  if (session && address) {
    return (
      <div className={styles.bigSpacerTop}>
        <Button
          onClick={() => signOut()}
          disabled={false}
          active={false}
          color={"black"}
          label="signout discord"
        />

        <Button onClick={() => disconnectWallet()} label="disconnect wallet" />
      </div>
    );
  }

  // 2. Connect with Discord (OAuth)
  if (!session) {
    return (
      <Box align="center" justify="center">
        <Paragraph margin={"xlarge"}>
          <Text weight={"bolder"} size="xlarge">
            Join our community
            <a
              href="https://discord.gg/Mmn5mVbA"
            >
              {" "}
              on discord{" "}
            </a>
            and get your Alpha Minter role.
          </Text>
        </Paragraph>
      </Box>
    );
  }

  // 1. Connect with MetaMask
  if (!address) {
    return (
      <div>
        <Button
          onClick={connectWithMetamask}
          disabled={false}
          active={false}
          color={"black"}
          label="Connect Wallet"
        />
      </div>
    );
  }
}
