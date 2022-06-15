import { useAddress, useDisconnect, useMetamask, useMintNFT, useNFTCollection } from "@thirdweb-dev/react";
import { Box, Card, Text, Button, Image, Spinner, Footer } from 'grommet'
import { useSession, signIn, signOut } from "next-auth/react";
import React, { useState } from "react";
import styles from "../styles/Theme.module.css";
import Airdrop from "./Airdrop";


import { Currency, Close, Checkmark } from 'grommet-icons'




const ConnectWallet = () => {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();
  const { data: session } = useSession();

return (
  <Box align="stretch" justify="center">
    <Box align="center" justify="center" pad="large" gap="none">
      <Box align="center" justify="center">
        <Card align="stretch" justify="center" direction="column" pad="large" gap="small">
          <Box align="center" justify="center" pad="xsmall" direction="column" gap="small">
            <Text textAlign="center">
              AUTHORIZED ACCESS ONLY
            </Text>
            <Text textAlign="center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet elementum, laoreet egestas elit vitae 

            </Text>
          </Box>
          <Box align="stretch" justify="center" pad="small" gap="small">
            <Button label="Connect Wallet" size="medium" primary onClick={() => connectWithMetamask()} />
            <Button label="Launch" active={false} disabled size="medium" />
          </Box>
        </Card>
      </Box>
    </Box>
  </Box>
)
}

const MintingInterfaceItem = () => {
  const address = useAddress();
  const nftCollectionContract = useNFTCollection(
    "0xD93bEC957B531Ce2Ea6b86F0132ed8a8ae4ad533"
  );

  async function mintNft() {
  
//    Ensure wallet connected
    // if (!address) {
    //   alert("Please reconnect your wallet to continue.");
    //   return;
    // }
  
    // // Ensure correct network
    // if (isOnWrongNetwork) {
    //   switchNetwork(ChainId.Rinkeby);
    //   return;
    // }
  
    console.log("generating signature ...")
  
    // Make a request to the API route to generate a signature for us to mint the NFT with
    const signature = await fetch(`/api/generate-signature`, {
      method: "POST",
      body: JSON.stringify({
        // Pass our wallet address (currently connected wallet) as the parameter
        claimerAddress: address,
      }),
    });
  
    // If the user meets the criteria to have a signature generated, we can use the signature
    // on the client side to mint the NFT from this client's wallet
    if (signature.status === 200) {
      const json = await signature.json();
      const signedPayload = json.signedPayload;
      const nft = await nftCollectionContract?.signature.mint(signedPayload);
  
      // Show a link to view the NFT they minted
      alert(
        `Success 🔥  Check out your NFT here: https://testnets.opensea.io/assets/rinkeby/0xD93bEC957B531Ce2Ea6b86F0132ed8a8ae4ad533/${nft.id.toNumber()}`
      );
    }
    // If the user does not meet the criteria to have a signature generated, we can show them an error
    else {
      alert("Something went wrong. Are you a member of the discord?");
    }
  }

  return (
    <Box align="stretch" justify="center" direction="column">
      <Box align="stretch" justify="center" pad="medium" direction="row" gap="small">
        <Box align="stretch" justify="center" direction="column">
          <Card direction="column" justify="center" align="stretch">
            <Box align="center" justify="center" pad="small" direction="column">
              <Image src="https://photos.smugmug.com/Pinnacles-May-2019/n-8KLNDR/i-bxkrqwL/0/1c7fa7f2/M/i-bxkrqwL-M.jpg" fill="horizontal" fit="cover" />
            </Box>
            <Box align="stretch" justify="between" direction="column" gap="small">
              <Box align="start" justify="center" pad="small">
                <Text textAlign="start" weight={"bolder"} margin="small">
                  SUMMERJAM
                </Text>
                <Text textAlign="start" size="xlarge" weight="bold" margin={"small"}>
                  Metaverse has never been this delightful
                </Text>
              </Box>
              <Box align="start" justify="center" gap="small">
                <Text>
                  Remarkable virtual craftsmanship meets ostentatious yet familiar design. Ingredients from a different dimension and extravagant hints of fruits suiting everyone's palate.
                </Text>
                <Text size="small" alignSelf="center" weight="bold" margin={"small"}>
                  Exclusive edition of 60 limited edition summer jams in three delightful varieties.
                </Text>
              </Box>
              <Box align="center" justify="start" pad="small" direction="row" gap="small">
                <Box align="center" justify="start" direction="row">
                  <Currency size="large" />
                </Box>
                <Box align="center" justify="center">
                  <Text size="large" weight="bold">
                    1 MATIC
                  </Text>
                </Box>
              </Box>
              <Box align="stretch" justify="center" pad="small" gap="small">
                {/* TODO:// display dynamically, based on mint and max supply. */}
                <Button label="0/60" />
                <Button label="Mint" primary onClick={() => mintNft()} />
              </Box>
            </Box>
          </Card>
        </Box>
      </Box>
    </Box>
  )
}

const MintingApprove = () => {
  
  return (                          
    <Box align="stretch" justify="center">
      <Box align="center" justify="center" pad="large">
        <Box align="center" justify="center">
          <Card align="stretch" justify="center" direction="column" pad="large">
            <Box align="stretch" justify="center" pad="xsmall" direction="column" gap="none">
              <Text textAlign="center">
                Follow steps
              </Text>
            </Box>
            <Box align="stretch" justify="center" pad="xsmall" direction="column" gap="none">
              <Box align="center" justify="start" direction="row" pad="small" gap="medium">
                <Spinner />
                <Text>
                  Approve Asset
                </Text>
              </Box>
            </Box>
            <Box align="stretch" justify="center" pad="xsmall" direction="column" gap="none">
              <Box align="start" justify="start" direction="row" gap="medium" pad="small">
                <Spinner />
                <Text>
                  Purchase
                </Text>
              </Box>
            </Box>
            <Box align="stretch" justify="center" pad="xsmall" direction="column" gap="none">
              <Button label="Cancel" disabled />
            </Box>
          </Card>
        </Box>
      </Box>
    </Box>
  )
}


export default function SignIn() {

  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();
  const { data: session } = useSession();

  const nftCollectionContract = useNFTCollection(
    "0xD93bEC957B531Ce2Ea6b86F0132ed8a8ae4ad533"
  );

  if (session && address) {
    return (
      // <MintingApprove/>
      <MintingInterfaceItem/>
      // <div className={styles.bigSpacerTop}>
      //   <Button
      //     onClick={() => signOut()}
      //     disabled={false}
      //     active={false}
      //     color={"black"}
      //     label="signout discord"
      //   />

      //   <Button onClick={() => disconnectWallet()} label="disconnect wallet" />
      // </div>
    );
  }

  // 2. Connect with Discord (OAuth)
  if (!session) {
    return (
      <Box align="stretch" justify="center">
      <Box align="center" justify="center" pad="large" direction="row" gap="small">
        <Box align="start" justify="center" gap="small" pad="small">
          <Text size="medium" textAlign="start">
            amet consectetur 
          </Text>
          <Text size="xxlarge">
            Lorem ipsum
amet consectetur adipiscing elit.
          </Text>
        </Box>
        <Box align="center" justify="center">
          <Image src="https://photos.smugmug.com/Pinnacles-May-2019/n-8KLNDR/i-bxkrqwL/0/1c7fa7f2/M/i-bxkrqwL-M.jpg" fill="horizontal" fit="cover" />
        </Box>
        <Box align="start" justify="start" gap="small" pad="small">
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet elementum, laoreet egestas elit vitae 
          </Text>
          <Button label="Login with Discord" onClick={() => signIn()} />
        </Box>
      </Box>
    </Box>
    );
  }

  

  // 1. Connect with MetaMask
  if (!address) {
    return (
<ConnectWallet/>
    );
  }
}


