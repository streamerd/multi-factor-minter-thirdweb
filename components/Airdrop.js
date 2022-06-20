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
    const claimConditions = [
      {
        startTime: saleStartTime, // start the presale now
        maxQuantity: 250, // limit how many mints for this test minting. for now it's 250 @ rinkeby.
        price: 0, // sale price
        snapshot: [
          "0xF2Bb8DCD9c246c03a42b029942DDD92Dd0Ea2302",
          "0xfac0475b677b54f72682E0EA633Ffa1088110dcf",
          "0xeA718966A209c5244D8Ad686560a97F29381a84F",
        ], // limit minting to only certain addresses
      },
    ];

    const tokenId = 0; // the id of the NFT to set claim conditions on
    await editionDrop.claimConditions.set(tokenId, claimConditions);
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
    // never deploy to a non-test network. 
    // we'll only run it via code (here, for now @ minting phase for convenience.) 
    // keeping here until we develop our dashboard to make those configurations without touching the source code.
    // await configClaimPhases();

    setIsClaiming(true);
    // restrict claiming only one ERC1155 token at a time. The amount is configured by us. 
    // for now, keeping textInput below and amount @ useState commented. we'll extract them to components later.
    await editionDrop.claimTo(address, 0, 1);
    setIsClaiming(false);
    setDisplayInfoToast(true);
  }

  return (
    <Box
      fill="vertical"
      // overflow="auto"
      align="center"
      flex="grow"
      pad="large"
    >
      <Card
        pad="medium"
        justify="center"
        direction="column"
        // align="stretch"
        gap="xxsmall"
      >
        <Text alignSelf="start" size="large">
          SUMMERJAM
        </Text>
        <Heading textAlign="start" size="small">
          Metaverse has never been this delightful
        </Heading>
        <Paragraph textAlign="start" size="large">
          Remarkable virtual craftsmanship meets ostentatious yet familiar
          design. Ingredients from a different dimension and extravagant hints
          of fruits suiting everyone&apos;s palate.
          <br></br> <br></br> Exclusive limited edition of 50 summer jams in
          three delightful varieties.
        </Paragraph>
     
          <Text> X/Y minted.</Text>

        {isClaiming ? <Spinner /> : null}
        {isClaiming ? <Button label="minting" disabled={true} /> : 
            <Button label="mint" disabled={false} onClick={() => claimNFT()} />
          }
        {/* <Button label="Connect Wallet" disabled={false} active={false} primary /> */}
        {address ? (
          <Box gap="small">
            {/* <TextInput
            placeholder={"number of tokens to mint"}
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          /> */}

          {/* {isClaiming ? <Button label="minting" disabled={true} /> : 
            <Button label="mint" disabled={false} onClick={() => claimNFT()} />
          } */}
            
            
            {displayInfoToast ? (
              <Notification
                background="#1a161c"
                toast
                title="Your NFT is on the way!"
                message="Please check your wallet, it should be there by now."
                onClose={() => setDisplayInfoToast(false)}
              />
            ) : null}
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
