import {
  useAddress,
  useDisconnect,
  useNFTCollection,
  useNetwork,
  useMetamask,
  useNetworkMismatch,
} from "@thirdweb-dev/react";

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

  return (
    <Box align="center" justify="center" background={"black"}>
      <Card
        align="stretch"
        justify="center"
        direction="column"
        pad="large"
        gap="small"
      >
        <Box
          align="center"
          justify="center"
          pad="xsmall"
          direction="column"
          gap="small"
        >
          <Heading size="small" textAlign="center">AUTHORIZED <br></br> ACCESS ONLY</Heading>
          <Paragraph textAlign="center">
            Connect your wallet to participate in the Alpha Drop.
          </Paragraph>
        </Box>
        <Box align="stretch" direction="column" justify="center" pad="small" gap="small">

        <Box gap="medium">
              {address ? ( <>
                       <Button color="white" size="medium" onClick={() => disconnectWallet()} margin="xsmall" color="white" > 
                       
                <Text background pad="small" color={"green"} margin="xsmall">
                  {address.slice(0, 4).concat("...").concat(address.slice(-3))}
                </Text>
                       </Button>

                       <Button label="Launch"  size="medium" />

              </>

              ) : (
                <>
                <Button
                label="Connect Wallet"
                size="medium"
                color={"white"}
                onClick={() => connectWithMetamask()}
              />
          <Button label="Launch" active={false} disabled size="medium" />
                </>
              )}
            </Box>
         
        </Box>
      </Card>
    </Box>
  );
}
