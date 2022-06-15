import React, {useState} from "react";
import { Box, Card, Text, Button, Image } from "grommet";
import { useAddress, useNFTCollection, useNetwork, useMetamask, useNetworkMismatch, useMintNFT } from "@thirdweb-dev/react";
import { useSession} from "next-auth/react";
// import {mintNft} from "./Minter"


export default function Airdrop(props) {
  const connectWithMetamask = useMetamask();
  const { data: session } = useSession();
  const address = useAddress();


  const isOnWrongNetwork = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();

  const nftCollectionContract = useNFTCollection(
    "0xD93bEC957B531Ce2Ea6b86F0132ed8a8ae4ad533"
  );

  // This is simply a client-side check to see if the user is a member of the discord in /api/check-is-in-server
  // We ALSO check on the server-side before providing the signature to mint the NFT in /api/generate-signature
  // This check is to show the user that they are eligible to mint the NFT on the UI.
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  // const { push, size } = React.useContext(RouterContext)
  

  async function mintNft() {

    // Ensure wallet connected
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
    <Box
      fill="vertical"
      overflow="auto"
      align="center"
      flex="grow"
      pad="xlarge"
    >
      <Card
        pad="large"
        justify="center"
        direction="column"
        align="stretch"
        gap="medium"
      >
        <Text size="xxlarge">Claim your spoon</Text>

        <Image
          src="https://photos.smugmug.com/Pinnacles-May-2019/n-8KLNDR/i-bxkrqwL/0/1c7fa7f2/M/i-bxkrqwL-M.jpg"
          fill="horizontal"
          fit="cover"
        />

        {/* <Button label="Connect Wallet" disabled={false} active={false} primary /> */}
        {session && address ? (
          <Box>

            <Button
              disabled={true}
              color={"green"}
              label="Wallet Connected"
            />
            <Button label="Claim NFT" disabled={false} onClick={() => mintNft()} />
          </Box>
        ) : (
          <>
            <Button
              onClick={connectWithMetamask}
              disabled={false}
              active={false}
              color={"black"}
              label="Connect Wallet"
            />
            <Button label="Claim NFT" disabled={true} />
          </>
        )}
      </Card>
    </Box>
  );
}
