import {
    useAddress,
    useNFTCollection,
    useNetwork,
    useNetworkMismatch,
  } from "@thirdweb-dev/react";
  import { ChainId } from "@thirdweb-dev/react";
  import React, { useState, useEffect } from "react";
  import SignIn from "../components/SignIn";
  import styles from "../styles/Theme.module.css";
  import { AlphaFooter } from "../components/Footer";
  import { useSession, signIn, signOut } from "next-auth/react";
  
  import { Box, Button, Text, Heading, ResponsiveContext } from "grommet";
  import Airdrop from "../components/Airdrop";
  // import { Airdrop } from "../components/Airdrop";
  
    // Function to create a signature on the server-side, and use the signature to mint the NFT

  export default async function mintNft() {

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
  
    // This is simply a client-side check to see if the user is a member of the discord in /api/check-is-in-server
    // We ALSO check on the server-side before providing the signature to mint the NFT in /api/generate-signature
    // This check is to show the user that they are eligible to mint the NFT on the UI.
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(false);
    // const { push, size } = React.useContext(RouterContext)
    
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