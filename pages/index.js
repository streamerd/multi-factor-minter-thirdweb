import {
  useAddress,
  useDisconnect,
  useNFTCollection,
  useNetwork,
  useMetamask,
  useNetworkMismatch,
} from "@thirdweb-dev/react";

import { ChainId } from "@thirdweb-dev/react";
import React, { useState, useEffect } from "react";
import SignIn from "../components/SignIn";
import styles from "../styles/Theme.module.css";
import { AlphaFooter } from "../components/Footer";
import { useSession, signIn, signOut } from "next-auth/react";

import { Image, Spinner, Card, Box, Button, Text, Heading } from "grommet";
import Airdrop from "../components/Airdrop";
// import { Airdrop } from "../components/Airdrop";

export default function Home() {
  // Grab the currently connected wallet's address
  const address = useAddress();

  // Get the currently authenticated user's session (Next Auth + Discord)
  const { data: session } = useSession();

  // Hooks to enforce the user is on the correct network (Mumbai as declared in _app.js) before minting
  const isOnWrongNetwork = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();

  // Get the NFT Collection we deployed using thirdweb+
  const nftCollectionContract = useNFTCollection(
    "0xD93bEC957B531Ce2Ea6b86F0132ed8a8ae4ad533"
  );

  const disconnectWallet = useDisconnect();

  // This is simply a client-side check to see if the user is a member of the discord in /api/check-is-in-server
  // We ALSO check on the server-side before providing the signature to mint the NFT in /api/generate-signature
  // This check is to show the user that they are eligible to mint the NFT on the UI.
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  // const { push, size } = React.useContext(RouterContext)
  useEffect(() => {
    if (session) {
      setLoading(true);
      fetch("api/check-has-role-in-server")
        .then((res) => res.json())
        .then((d) => {
          setData(d || undefined);
          setLoading(false);
        });
    }
  }, [session]);

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

    const Landing = () => {
    
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


            <Button label="Login with Discord"  onClick={() => signIn()} />
          </Box>
        </Box>
      </Box>
    )
  }

  
  // Function to create a signature on the server-side, and use the signature to mint the NFT
  async function mintNft() {
    // Ensure wallet connected
    if (!address) {
      alert("Please connect your wallet to continue.");
      return;
    }

    // Ensure correct network
    if (isOnWrongNetwork) {
      switchNetwork(ChainId.Rinkeby);
      return;
    }

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

  // return (
  //   <Box pad="small">
  //   <AlphaFooter/>
  // </Box>

  // )



  return (
    <div>
      <Box fill="horizontal" overflow="auto" align="stretch" flex="grow">
        <Box
          height={"10%"}
          align="center"
          justify="between"
          direction="row"
          pad="small"
          background={{ dark: false, color: "black" }}
        >
          <Box
            pad={"2%"}
            height={"xxsmall"}
            align="stretch"
            justify="start"
            direction="row"
          >
            <Text weight="bold" color="light-1" alignSelf="center">
              JUSTADDMETA
            </Text>
          </Box>
          <Box align="stretch" justify="start" direction="row" gap="medium">
            {session ? (
              <>
                {/* <Text color={"white"}> hey {session.user.name}</Text> */}
                <Button
                  color={"white"}
                  onClick={() => signOut()}
                  disabled={false}
                  active={false}
                >
                 discord {"|>"}
                </Button>
              </>
            ) : (
              <Button color={"white"} onClick={() => signIn()}>
                connect discord
              </Button>
            )}
            {/* <Button color={"white"} >connect discord</Button> */}

            <Box background={""} direction="row" gap="medium">
              {address ? ( <>
                       <Button onClick={() => disconnectWallet()} margin="xsmall" color="white" > 
                       
                <Text background pad="small" color={"yellow"} margin="xsmall">
                  {address.slice(0, 4).concat("...").concat(address.slice(-3))}
                </Text>
                       {"|>"}
                       </Button>
              </>

              ) : (
                <Text background pad="small" color={"black"}>
                 .
                </Text>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box background={"light-2"} height="large">
        {!session ? (
          // <Box background={"blue"}>. </Box>
          // <Airdrop />
          <Landing/>
        ) : (
          <SignIn />
        )}
      </Box>
      <AlphaFooter claimable={false} />
    </div>
  );
}
