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
import { AlphaFooter } from "../components/Footer";
import AuthOnly from "../components/AuthOnly";

import {
  Image,
  Card,
  Box,
  Button,
  Text,
  Heading,
  Paragraph,
} from "grommet";
// import { Airdrop } from "../components/Airdrop";

export default function Home() {
  // Grab the currently connected wallet's address
  const address = useAddress();
  const isOnWrongNetwork = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();

  const [authStarted, setAuthStarted] = useState(false);

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

  

  const Landing = () => {
    if (!authStarted) {
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
                  onClick={() => setAuthStarted(true)}
                />
              </Box>
            </Box>
          </Box>
     </>
      );
    }
    // because we've set authStarted to true,
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

 
  return (
    <div>
  
      <Box fill="horizontal" overflow="auto" align="stretch" flex="grow">
        <Box
          // height={"0%"}
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
                <Button color={"green"} label="connected" onClick={() => disconnectWallet()} size="large" />
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
