// import { getSession } from "next-auth/react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";


export default async function generateNftSignature(req, res) {
  // Get the Next Auth session so we can use the accessToken as part of the discord API request
  // const session = await getSession({ req });

  // Put Your Discord Server ID here
  // const discordServerId = "613678848923533323";

  // Grab the claimer address (currently connected address) out of the request body
  const { claimerAddress } = JSON.parse(req.body);

  // // Read the access token from the session so we can use it in the below API request
  // const accessToken = session?.accessToken;

  // // Make a request to the Discord API to get the servers this user is a part of
  // const response = await fetch(`https://discordapp.com/api/users/@me/guilds`, {
  //   headers: {
  //     Authorization: `Bearer ${accessToken}`,
  //   },
  // });

  // // Parse the response as JSON
  // const data = await response.json();
  // // You may get rate limited here and receive an error.

  // // Filter all the servers to find the one we want
  // // Returns undefined if the user is not a member of the server
  // // Returns the server object if the user is a member
  // const discordMembership = data?.find(
  //   (server) => server.id === discordServerId
  // );

  // // Return an error response if the user is not a member of the server
  // // This prevents the signature from being generated if they are not a member
  // if (!discordMembership) {
  //   res.status(403).send("User is not a member of the discord server.");
  //   return;
  // }

  // You'll need to add your private key in a .env.local file in the root of your project
  // !!!!! NOTE !!!!! NEVER LEAK YOUR PRIVATE KEY to anyone!
  // This allows us (the contract owner) to control the generation of the mint signatures
  if (!process.env.PRIVATE_KEY) {
    throw new Error("You're missing PRIVATE_KEY in your .env.local file.");
  }

  // Initialize the Thirdweb SDK on the serverside using the private key on the mumbai network
  const sdk = ThirdwebSDK.fromPrivateKey(process.env.PRIVATE_KEY, "rinkeby");

  // Load the NFT Collection via it's contract address using the SDK
  const nftCollection = sdk.getNFTCollection(
    "0xd93bec957b531ce2ea6b86f0132ed8a8ae4ad533"
  );

  // Generate the signature for the NFT mint transaction
  const signedPayload = await nftCollection.signature.generate({
    to: claimerAddress,
    metadata: {
      name: ` SUMMERJAM NFT`,
      // image: `${session.user.image}`,
      image: "https://avatars.githubusercontent.com/u/97170049?s=400&u=d0e11ba3c9e71fccddc3c79c65d8d20b7dc27526&v=4",
      description: `A SUMMERJAM NFT!`,
    },
  });

  // Return back the signedPayload (mint signature) to the client.
  res.status(200).json({
    signedPayload: JSON.parse(JSON.stringify(signedPayload)),
  });
}
