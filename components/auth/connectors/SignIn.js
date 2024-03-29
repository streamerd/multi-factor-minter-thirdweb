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

  if ( address) {
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

  // // 2. Connect with Discord (OAuth)
  // if (!session) {
  //   return (
  //     <div className={`${styles.main}`}>
  //       <h2 className={styles.noGapBottom}> let&apos;s jam </h2>

  //       <Paragraph margin={"large"}>
  //         <Text weight={"bolder"} size="xlarge">
  //           Join our discord and get your Alpha Minter role.
  //         </Text>
  //       </Paragraph>

  //       <button onClick={signIn}>
  //         <Box
  //           background={"purple"}
  //           width="200px"
  //           height={"80px"}
  //           pad="xsmall"
  //           alignSelf="center"
  //         >
  //           <Text size="xlarge" color={"white"}>
  //             Connect Discord
  //           </Text>
  //         </Box>
  //       </button>
  //     </div>
  //   );
  // }

  // 1. Connect with MetaMask
  if (!address) {
    return (
      <div>
        <Airdrop />

        {/* <Paragraph>

        continue with a wallet.
        </Paragraph>
        <button onClick={connectWithMetamask}>
          <Box background={"orange"} 
          alignSelf="end"
          width="200px" height={"60px"} alignContent="center">
            connect
          </Box>
        </button> */}
      </div>
    );
  }
}
