import React, { useState } from "react";
import {
  Box,
  Card,
  Heading,
  Text,
  Button,
  Image,
  Spinner,
  TextInput,
} from "grommet";
import {
  useAddress,
  useNFTBalance,
  useNFTCollection,
  useNetwork,
  useMetamask,
  useNetworkMismatch,
  useMintNFT,
  useEditionDrop,
} from "@thirdweb-dev/react";
// import { useSession} from "next-auth/react";
// import {mintNft} from "./Minter"

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

  const { data: balance, isLoading } = useNFTBalance(editionDrop, address, "0");
  // This is simply a client-side check to see if the user is a member of the discord in /api/check-is-in-server
  // We ALSO check on the server-side before providing the signature to mint the NFT in /api/generate-signature
  // This check is to show the user that they are eligible to mint the NFT on the UI.
  const [data, setData] = useState(null);
  // const [isLoading, setLoading] = useState(false);
  // const { push, size } = React.useContext(RouterContext)

  const [amount, setAmount] = useState(1);

  const MintingApprove = () => {
    const { push } = React.useContext(RouterContext);

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

  

  const configClaimPhases = async () => {
    const presaleStartTime = new Date();
    const publicSaleStartTime = new Date(Date.now() + 60 * 60 * 24 * 1000);
    const claimConditions = [
      {
        startTime: presaleStartTime, // start the presale now
        maxQuantity: 100, // limit how many mints for this presale
        price: 0.01, // presale price
        snapshot: ["0xF2Bb8DCD9c246c03a42b029942DDD92Dd0Ea2302"], // limit minting to only certain addresses
      },
      {
        startTime: publicSaleStartTime, // 24h after presale, start public sale
        price: 0.08, // public sale price
      },
    ];

    const tokenId = 0; // the id of the NFT to set claim conditions on
    await editionDrop.claimConditions.set(tokenId, claimConditions);
  };

  async function mintNft(amount) {
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

    // just once
    // await lazyMint();
    //  await configClaimPhases();

    if(amount > 3) {
      alert("You can only mint 3 NFTs at a time.");
      return;
    }
    setIsClaiming(true);

    await editionDrop.claim(0, amount);

    console.log(
      `just called editionDrop.claim ... should mint ${amount} NFT(s)`
    );

    // Make a request to the API route to generate a signature for us to mint the NFT with

    // const signature = await fetch(`/api/generate-signature`, {
    //   method: "POST",
    //   body: JSON.stringify({
    //     // Pass our wallet address (currently connected wallet) as the parameter
    //     claimerAddress: address,
    //   }),
    // });

    // If the user meets the criteria to have a signature generated, we can use the signature
    // on the client side to mint the NFT from this client's wallet
    // if (signature.status === 200) {
    //   const json = await signature.json();
    //   const signedPayload = json.signedPayload;
    //   const nft = await nftCollectionContract?.signature.mint(signedPayload);

    //   // Show a link to view the NFT they minted
    //   alert(
    //     `Success 🔥  Check out your NFT here: https://testnets.opensea.io/assets/rinkeby/0xD93bEC957B531Ce2Ea6b86F0132ed8a8ae4ad533/${nft.id.toNumber()}`
    //   );
    // }
    // // If the user does not meet the criteria to have a signature generated, we can show them an error
    // else {
    //   alert("Something went wrong. Are you a member of our discord?");
    // }
  }

  return (
    <Box
      fill="vertical"
      overflow="auto"
      align="center"
      flex="grow"
      pad="xlarge"
    >
      {/* <Card
        pad="large"
        justify="center"
        direction="column"
        align="stretch"
        gap="medium"
      > */}
      <Heading>SUMMERJAM</Heading>

      {/* <Button label="Connect Wallet" disabled={false} active={false} primary /> */}
      {address ? (
        <Box>
          <TextInput
            placeholder="number of tokens"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
          {/* <TextInput>asd</TextInput> */}
          <Button
            label="mint"
            disabled={false}
            onClick={() => mintNft(amount)}
          />
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
      {/* </Card> */}
    </Box>
  );
}
