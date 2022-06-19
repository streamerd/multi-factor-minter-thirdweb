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
import AuthOnly from "../components/AuthOnly";

import {
  Image,
  Spinner,
  Card,
  Box,
  Button,
  Text,
  Heading,
  Paragraph,
} from "grommet";
import Airdrop from "../components/Airdrop";
import Welcome from "../components/Welcome";
import { Onedrive } from "grommet-icons";
// import { Airdrop } from "../components/Airdrop";

export default function Home() {
  const connectWithMetamask = useMetamask();
  // Grab the currently connected wallet's address
  const address = useAddress();
  const isOnWrongNetwork = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();

  const [mintingStarted, setMintingStarted] = useState(false);

  // Get the currently authenticated user's session (Next Auth + Discord)
  const { data: session } = useSession();

  // Hooks to enforce the user is on the correct network (Mumbai as declared in _app.js) before minting

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
  // useEffect(() => {
  //   if (session) {
  //     setLoading(true);
  //     fetch("api/check-has-role-in-server")
  //       .then((res) => res.json())
  //       .then((d) => {
  //         setData(d || undefined);
  //         setLoading(false);
  //       });
  //   }
  // }, [session]);

  const MintingApprove = () => {
    return (
      <Box align="stretch" justify="center">
        <Box align="center" justify="center" pad="large">
          <Box align="center" justify="center">
            <Card
              align="stretch"
              justify="center"
              direction="column"
              pad="large"
            >
              <Box
                align="stretch"
                justify="center"
                pad="xsmall"
                direction="column"
                gap="none"
              >
                <Text textAlign="center">Follow steps</Text>
              </Box>
              <Box
                align="stretch"
                justify="center"
                pad="xsmall"
                direction="column"
                gap="none"
              >
                <Box
                  align="center"
                  justify="start"
                  direction="row"
                  pad="small"
                  gap="medium"
                >
                  <Spinner />
                  <Text>Approve Asset</Text>
                </Box>
              </Box>
              <Box
                align="stretch"
                justify="center"
                pad="xsmall"
                direction="column"
                gap="none"
              >
                <Box
                  align="start"
                  justify="start"
                  direction="row"
                  gap="medium"
                  pad="small"
                >
                  <Spinner />
                  <Text>Purchase</Text>
                </Box>
              </Box>
              <Box
                align="stretch"
                justify="center"
                pad="xsmall"
                direction="column"
                gap="none"
              >
                <Button label="Cancel" disabled />
              </Box>
            </Card>
          </Box>
        </Box>
      </Box>
    );
  };

  const Landing = () => {
    if (!mintingStarted) {
      return (
        <>
          <Box
            width={"50%"}
            background="black"
            justify="center"
            align="end"
            pad={"large"}
          >
            <Image width={"460px"} height={"500px"}></Image>
          </Box>
          <Box width={"50%"} background="black" pad={"32px"} justify="center">
            <Box direction="column" pad={"xsmall"}>
              <Text size="large" textAlign="start">
                SUMMERJAM NFT
              </Text>
              <Heading size="medium" textAlign="start" color={"#e326cc"}>
                SOME LONGER AND BIGGER HEADING
              </Heading>
            </Box>

            <Box direction="column" margin={"small"} gap={"medium"}>
              <Text textAlign="start">
                We are happy to announce the first holistic drop to our
                JUSTADDMETA collection. It is our most ambitious project to date
                and took a lot of planning, designing and technological
                development. It is the beginning of our own ecosystem, with much
                more to come.
              </Text>

              <Text textAlign="start">
                In order to celebrate the name & everyone behind the vision, we
                decided to drop a collection of limited edition NFTs. Those who
                are lucky enough to get their hands on one of the just 50 jam
                NFTs are in for an interesting ride through the metaverse and
                our vision of it. The journey has only begun. Look out for new
                drops & hidden features.
              </Text>
              <Box>
                <Button
                  alignSelf="start"
                  label="Start Minting"
                  size="large"
                  onClick={() => setMintingStarted(true)}
                />
              </Box>
            </Box>
          </Box>
        </>
      );
    }
    // because we've set mintingStarted to true,
    // we can now render the AuthOnly component
    else {
      
      return (
        <>
        
        <Box
          width={"50%"}
          background="black"
          justify="center"
          align="end"
          pad={"32px"}
        >
          <Image width={"460px"} height={"500px"}></Image>
        </Box>
        <Box align="start" width={"50%"} background="black" pad={"32px"} justify="center">
          <AuthOnly/>
        </Box>
      </>
        );
    }
  };

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
      alert("Something went wrong. Are you a member of the JAM discord?");
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
          height={"0%"}
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
            <Text
              weight="bolder"
              color="light-1"
              alignSelf="center"
              size="xlarge"
            >
              JUSTADDMETA
            </Text>
          </Box>

          <Box align="stretch">
            <Box direction="row" gap="small" pad={"xsmall"}>
              <Button color={"white"} label="mint" size="large" />
              <Button color={"white"} label="claim" size="large" />
              <Button color={"white"} label="burn" size="large" />
              {address ? (
                <Button color={"green"} label="connected" size="large" />
              ) : (
                <Button color={"red"} label="not connected" size="large" />
              )}
            </Box>

            {/* <Button color={"white"} >connect discord</Button> */}
          </Box>
        </Box>
      </Box>
      <Box background={"light-2"} height="large" direction="row">
        <Landing />
      </Box>
      <AlphaFooter />
    </div>
  );
}
