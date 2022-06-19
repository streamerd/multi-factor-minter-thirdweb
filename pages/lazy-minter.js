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
import { Heading } from "grommet";
import React, { useState } from "react";

const ClaimPhaser = async () => {
  const presaleStartTime = new Date();
  const publicSaleStartTime = new Date(Date.now() + 60 * 60 * 24 * 1000);
  const claimConditions = [
    {
      startTime: presaleStartTime, // start the presale now
      maxQuantity: 2, // limit how many mints for this presale
      price: 0.01, // presale price
      snapshot: ["0x...", "0x..."], // limit minting to only certain addresses
    },
    {
      startTime: publicSaleStartTime, // 24h after presale, start public sale
      price: 0.08, // public sale price
    },
  ];

  const tokenId = 0; // the id of the NFT to set claim conditions on
  await contract.claimConditions.set(tokenId, claimConditions);
};

export default async function LazyMinter() {

  const connectWithMetamask = useMetamask();
  const address = useAddress();
  const isOnWrongNetwork = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();

  const editionDrop = useEditionDrop(
    "0xdB8Ce6A8F0f4b50516F39ea66494172f29363d70"
  );
  const [isClaiming, setIsClaiming] = useState(false);
  const { data: balance, isLoading } = useNFTBalance(editionDrop, address, "0");

  const metadatas = [
    {
      name: "JAM1",
      description: "This is a Purple JAM",
    //   image: fs.readFileSync("path/to/image.png"), // This can be an image url or file
        image: "https://i.imgur.com/48dRmwN.png",
},
    {
      name: "JAM2",
      description: "This is Turquise JAM",
      image: "https://i.imgur.com/mSBSyOz.png",
    },
  ];
  

  const results = await editionDrop.createBatch(metadatas); // uploads and creates the NFTs on chain
  const firstTokenId = results[0].id; // token id of the first created NFT
  const firstNFT = await results[0].data(); // (optional) fetch details of the first created NFT

return (<>
<Heading>ASDF</Heading>
</>)
}
