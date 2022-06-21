import React, { useState } from "react";

import {
  Box,
  Card,
  Heading,
  Text,
  Button,
  Notification,
  Spinner,
  TextInput,
  Paragraph,
  CardHeader,
  CardBody,
  CardFooter,
} from "grommet";
import {
  useAddress,
  // useNFTBalance,
  useNFTCollection,
  useNetwork,
  useMetamask,
  useNetworkMismatch,
  useEditionDrop,
} from "@thirdweb-dev/react";

import { StatusGood, Validate } from "grommet-icons";

export default function Airdrop() {
  const connectWithMetamask = useMetamask();
  // const { data: session } = useSession();
  const address = useAddress();

  const isOnWrongNetwork = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();

  const nftCollectionContract = useNFTCollection(
    "0xD93bEC957B531Ce2Ea6b86F0132ed8a8ae4ad533"
  );
  const editionDrop = useEditionDrop(
    "0xB4B8f15C9FF18B01D6894713c2e7712fBE2871Ca"
  );
  const [isClaiming, setIsClaiming] = useState(false);
  const [justClaimed, setJustClaimed] = useState(false); // so we can show -mint another- instead -mint- text on button.
  // const [amount, setAmount] = useState(1); // max mint amount at a time, default 1
  const [totalMinted, setTotalMinted] = useState(0);

  const [displayInfoToast, setDisplayInfoToast] = useState(false);
  // const MintingApprove = () => {
  //   const { push } = React.useContext(RouterContext);

  //   return (
  //     <Box align="stretch" justify="center">
  //       <Box align="center" justify="center" pad="large">
  //         <Box align="center" justify="center">
  //           <Card
  //             align="stretch"
  //             justify="center"
  //             direction="column"
  //             pad="large"
  //           >
  //             <Box
  //               align="stretch"
  //               justify="center"
  //               pad="xsmall"
  //               direction="column"
  //               gap="none"
  //             >
  //               <Text textAlign="center">Follow steps</Text>
  //             </Box>
  //             <Box
  //               align="stretch"
  //               justify="center"
  //               pad="xsmall"
  //               direction="column"
  //               gap="none"
  //             >
  //               <Box
  //                 align="center"
  //                 justify="start"
  //                 direction="row"
  //                 pad="small"
  //                 gap="medium"
  //               >
  //                 <Spinner />
  //                 <Text>Approve Asset</Text>
  //               </Box>
  //             </Box>
  //             <Box
  //               align="stretch"
  //               justify="center"
  //               pad="xsmall"
  //               direction="column"
  //               gap="none"
  //             >
  //               <Box
  //                 align="start"
  //                 justify="start"
  //                 direction="row"
  //                 gap="medium"
  //                 pad="small"
  //               >
  //                 <Spinner />
  //                 <Text>Purchase</Text>
  //               </Box>
  //             </Box>
  //             <Box
  //               align="stretch"
  //               justify="center"
  //               pad="xsmall"
  //               direction="column"
  //               gap="none"
  //             >
  //               <Button label="Cancel" disabled />
  //             </Box>
  //           </Card>
  //         </Box>
  //       </Box>
  //     </Box>
  //   );
  // };

  const configClaimPhases = async () => {
    const saleStartTime = new Date();

    let tokenId = null;
    const claimConditionsJAM0 = [
      {
        startTime: saleStartTime, // start the presale now
        maxQuantity: 1000, // limit how many mints for this test minting. for now it's 250 @ rinkeby.
        price: 0, // sale price
        snapshot: [
          "0xF2Bb8DCD9c246c03a42b029942DDD92Dd0Ea2302",
          "0xfac0475b677b54f72682E0EA633Ffa1088110dcf",
          "0xeA718966A209c5244D8Ad686560a97F29381a84F",
        ], // limit minting to only certain addresses
      },
    ];

    tokenId = 0; // the id of the NFT to set claim conditions on
    await editionDrop.claimConditions.set(tokenId, claimConditionsJAM0);

    const claimConditionsJAM1 = [
      {
        startTime: saleStartTime, // start the presale now
        maxQuantity: 1000, // limit how many mints for this test minting. for now it's 250 @ rinkeby.
        price: 0, // sale price
        snapshot: [
          "0xF2Bb8DCD9c246c03a42b029942DDD92Dd0Ea2302",
          "0xfac0475b677b54f72682E0EA633Ffa1088110dcf",
          "0xeA718966A209c5244D8Ad686560a97F29381a84F",
        ], // limit minting to only certain addresses
      },
    ];

    tokenId = 1;
    await editionDrop.claimConditions.set(tokenId, claimConditionsJAM1);
  };

  const claimProcessWindow = () => {
    return (
      <Card height="small" width="small" background="light-1">
        <CardHeader pad="medium">follow steps</CardHeader>
        <CardBody pad="medium">
          <Box direction="column">
            <Box direction="row">
              <Text>Approved Asset</Text>
              <StatusGood size="medium" />
            </Box>
            <Box direction="row">
              <Spinner size="medium" margin={"xsmall"} />
              <Text>Purchase</Text>
            </Box>
          </Box>
        </CardBody>
        <CardFooter pad={{ horizontal: "small" }} background="light-2">
          {/* <Button
    icon={<Icons.Favorite color="red" />}
    hoverIndicator
    /> */}
          cardFooter
          {/* <Button icon={<Icons.ShareOption color="plain" />} hoverIndicator /> */}
        </CardFooter>
      </Card>
    );
  };

  async function claimNFT() {
    // Ensure wallet connected
    if (!address) {
      alert("Please reconnect your wallet to continue.");
      return;
    }

    // Ensure correct network
    if (isOnWrongNetwork) {
      switchNetwork(ChainId.Rinkeby);
      return;
    }

    // just once, from time to time. just run it locally,
    // !! unless updates not needed or it's nnever leave uncommented.
    // await configClaimPhases();
    // we'll only run it via code (here, for now @ minting phase for convenience.)
    // keeping here until we develop our dashboard to make those configurations without touching the source code.

    setIsClaiming(true);
    // restrict claiming only one ERC1155 token at a time. The amount is configured by us.
    // for now, keeping textInput below and amount @ useState commented. we'll extract them to components later.
    await editionDrop.claimTo(address, 1, 1);
    setIsClaiming(false);
    setJustClaimed(true);
    setDisplayInfoToast(true);
  }

  return (
    <Box
      fill="vertical"
      // overflow="auto"
      align="center"
      flex="grow"
      pad="medium"
    >
      <Card
        pad="medium"
        justify="center"
        direction="column"
        // align="stretch"
        gap="xxsmall"
      >
        <CardBody pad="medium" gap="medium">
          <Box direction="row" gap="medium">
            <Text alignSelf="start" size="large">
              SUMMERJAM
            </Text>
            <Validate size="medium" />
          </Box>

          {address && !isClaiming && !justClaimed ? (
            <>
              <Heading textAlign="start" size="small">
                Metaverse has never been this delightful
              </Heading>
              <Paragraph textAlign="start" size="large">
                Remarkable virtual craftsmanship meets ostentatious yet familiar
                design. Ingredients from a different dimension and extravagant
                hints of fruits suiting everyone&apos;s palate.
                
              </Paragraph>

              <Paragraph textAlign="start" size="large">
               Exclusive limited edition of 50 summer jams
                in three delightful varieties.
              </Paragraph>

              <Paragraph textAlign="center" size="large">
                             X/50 minted

              </Paragraph>
              {/* <Paragraph textAlign="center" size="large">
              X/50 minted
              </Paragraph> */}
              {/* <Text size="large" margin={"xsmall"}>
                {" "}
                
              </Text> */}
              <Button
                label="mint"
                size="large"
                disabled={false}
                onClick={() => claimNFT()}
              />
            </>
          ) : null}
          {isClaiming ? (
            <Box direction="column" gap="large" margin={"medium"}>
              <Box direction="row" gap="small" size="large">
                <StatusGood size="large" alignSelf="center" />
                <Text size="xxlarge"> Approve asset</Text>{" "}
              </Box>
              <Box direction="row" gap="small" size="large">
                <Spinner size="medium" alignSelf="center" />
                <Text size="xxlarge"> Confirm purchase</Text>
              </Box>
            </Box>
          ) : (
            <></>
          )}

          {!isClaiming && justClaimed ? (
            <>
              <Box direction="column" gap="medium">
                <Box direction="row" gap="small" size="large">
                  <StatusGood size="large" alignSelf="center" />
                  <Text size="xxlarge"> Asset Approval</Text>{" "}
                </Box>
                <Box direction="row" gap="small" size="large">
                  <StatusGood size="large" alignSelf="center" />
                  <Text size="xxlarge"> Asset Purchase </Text>
                </Box>
                {/* <Box direction="row" gap="small" size="large">
              <StatusGood size="medium" alignSelf="center" />
              <Text size="xxlarge"> Minted</Text>
            </Box> */}
              </Box>
            </>
          ) : null}
          {/* <Button label="Connect Wallet" disabled={false} active={false} primary /> */}
          {!isClaiming && !address ? (
            <>
              <Button
                onClick={connectWithMetamask}
                disabled={false}
                active={false}
                color={"black"}
                label="Connect Wallet"
                size="large"
              />
              <Button size="large" label="Claim NFT" disabled={true} />
            </>
          ) : null}

          {displayInfoToast ? (
            <Notification
              toast
              background="#1a161c"
              title="You've got a SUMMERJAM NFT!"
              message="Please check your wallet, it should be there by now."
              onClose={() => setDisplayInfoToast(false)}
            />
          ) : null}
        </CardBody>
        <CardFooter pad={"medium"}></CardFooter>
      </Card>
    </Box>
  );
}
