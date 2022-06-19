import {
  useAddress,
  useDisconnect,
  useNFTCollection,
  useNetwork,
  useMetamask,
  useNetworkMismatch,
} from "@thirdweb-dev/react";

import React, { useState, useEffect } from "react";

import Airdrop from "./Airdrop";

import { ChainId } from "@thirdweb-dev/react";

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
export default function AuthOnly() {
  const connectWithMetamask = useMetamask();
  // Grab the currently connected wallet's address
  const address = useAddress();
  const isOnWrongNetwork = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();

  const [mintingStarted, setMintingStarted] = useState(false);

  const XX = () => {
    console.log(`INSITDE `);
    if (!mintingStarted) {
      return (
        <Box align="stretch" justify="center" direction="column">
          <Box
            align="stretch"
            justify="center"
            pad="medium"
            direction="row"
            gap="small"
          >
            <Box align="stretch" justify="center" direction="column">
              <Card direction="column" justify="center" align="stretch">
                <Box
                  align="center"
                  justify="center"
                  pad="small"
                  direction="column"
                >
                  <Image
                    src="https://photos.smugmug.com/Pinnacles-May-2019/n-8KLNDR/i-bxkrqwL/0/1c7fa7f2/M/i-bxkrqwL-M.jpg"
                    fill="horizontal"
                    fit="cover"
                  />
                </Box>
                <Box
                  align="stretch"
                  justify="between"
                  direction="column"
                  gap="small"
                >
                  <Box align="start" justify="center" pad="small">
                    <Text textAlign="start" weight={"bolder"} margin="small">
                      SUMMERJAM
                    </Text>
                    <Text
                      textAlign="center"
                      size="xlarge"
                      weight="bold"
                      margin={"small"}
                    >
                      Metaverse has never been this delightful
                    </Text>
                  </Box>
                  <Box align="center" justify="center" gap="small">
                    <Paragraph textAlign="center">
                      Remarkable virtual craftsmanship meets ostentatious yet
                      familiar design.
                    </Paragraph>

                    <Paragraph>
                      Ingredients from a different dimension and extravagant
                      hints of fruits suiting everyone&apos;s palate.
                    </Paragraph>
                    <Text
                      size="small"
                      alignSelf="center"
                      weight="bold"
                      margin={"small"}
                    >
                      Exclusive edition of 60 limited edition summer jams in
                      three delightful varieties.
                    </Text>
                  </Box>
                  <Box
                    align="center"
                    justify="start"
                    pad="small"
                    direction="row"
                    gap="small"
                  >
                    <Box align="center" justify="start" direction="row">
                      {/* <Currency size="large" /> */}
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
      );
    }
  };

  return (
    <Box align="center" justify="center" background={"black"}>
      {/* <Card
        align="stretch"
        justify="center"
        direction="column"
        pad="large"
        gap="small"
      > */}

      <Box
        align="center"
        justify="center"
        pad="xsmall"
        direction="column"
        gap="small"
      >
        {!address ? (
          <Heading size="small" textAlign="center">
            AUTHORIZED <br></br> ACCESS ONLY
          </Heading>
        ) : (null)}
        {!address && !mintingStarted ? (
          <>
            <Paragraph textAlign="center">
              Connect your wallet to participate in the Alpha Drop.
            </Paragraph>

            <Button
              label="Connect Wallet"
              size="large"
              color={"white"}
              onClick={() => connectWithMetamask()}
            />
            <Button label="Launch" active={false} disabled size="large" />
          </>
        ) : null}
      </Box>
      <Box
        align="stretch"
        direction="column"
        justify="center"
        pad="small"
        gap="small"
      >
        <Box gap="medium">
          {address && !mintingStarted ? (
            <>
              <Button
                color="white"
                margin="xsmall"
                size="large"
                active={false}
                // onClick={() => disconnectWallet()}
              >
                <Text
                  size="large"
                  background
                  pad="small"
                  color={"white"}
                  margin="xsmall"
                >
                  {address.slice(0, 4).concat("...").concat(address.slice(-3))}
                </Text>
              </Button>
              <Button
                label="Launch"
                size="large"
                onClick={() => setMintingStarted(true)}
              />
            </>
          ) : null}

          {mintingStarted ? <Airdrop /> : null}
        </Box>
      </Box>
      {/* </Card> */}
    </Box>
  );
}
