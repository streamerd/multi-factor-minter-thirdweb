# JAM Alpha Minting app

## Introduction

A[signature-based minting with thirdweb sdk](https://portal.thirdweb.com/python/erc721-signature-minting), multi-factor auth'ed minter dapp to appreciate the members of JUSTADDMETA community on discord. 

Via this dapp, first we are connecting users with their Discord account, and generate signatures for an NFT (to claim there), if the user is a **member** @ JUSTADDMETA's discord server **and** have a specific role we'd set, by role's id @ discord.

So it is a multi-factor authenticated minter app, reflecting its social formations as well.

## Tools used for JAM Alpha Minting event app:

- [**thirdweb React SDK**](https://docs.thirdweb.com/react): To connect to our NFT Collection Smart contract via React hooks such as [useNFTCollection](https://docs.thirdweb.com/react/react.usenftcollection), and allow users to sign in with [useMetamask](https://docs.thirdweb.com/react/react.usemetamask).

- [**thirdweb NFT Collection**](https://portal.thirdweb.com/contracts/nft-collection): This is the smart contract that our NFTs will be created into.

- [**thirdweb TypeScript SDK**](https://docs.thirdweb.com/typescript): To mint new NFTs with [signature based minting](https://docs.thirdweb.com/typescript/sdk.nftcollection.signature)!

- [**Next JS API Routes**](https://nextjs.org/docs/api-routes/introduction): For us to securely generate signatures on the server-side, on behalf of our wallet, using our wallet's private key. As well as making server-side queries to the Discord APIs with the user's access token to view which servers they are part of.

- [**Next Auth**](https://next-auth.js.org/): To authenticate with Discord and access the user's Discord data such as their username, and which servers they are members of.


```bash
npm install
# or
yarn install
```

- Run the development server:

```bash
npm run start
# or
yarn start
```

- Visit http://localhost:3000/ to view it.

# Guide

This project uses signature-based minting to grant mint signatures to wallets who meet a certain set of criteria.

You can see the basic flow of how signature based minting works in this application below:

![Signature Based Minting Diagram](https://camo.githubusercontent.com/bb1faa695e6c5968fb6f264ef49c3e3d3981e4a67654370b220b7bf491d69382/68747470733a2f2f63646e2e686173686e6f64652e636f6d2f7265732f686173686e6f64652f696d6167652f75706c6f61642f76313635303935383535393234392f53386d6c5a49515a6d2e706e67)

In this example, we use signature-based minting to exclusively grant signatures to users who are members of JUSTTADDMETA's Discord server with ID:  `882215214894940170`

The general flow of the application is this:

1. User authenticates / signs in with Discord
2. User connects their wallet with MetaMask
3. User attempts **mint** function
4. Server checks if user is a member of the Discord server
5. If the user is a member, the server generates a signature for the user's wallet
6. The server sends the signature to the client
7. The client uses the signature to mint an NFT into their wallet

In the below sections, we'll outline how each of these steps work and explain the different parts of the application.

## Connecting with Metamask Wallet

We have a component that handles the sign in logic for both Coinbase and Discord in [/components/SignIn.js](/components/SignIn.js).

For the MetaMask connection, we are using the [useMetamask](https://docs.thirdweb.com/react/react.usemetamask) hook from the thirdweb React SDK.

```jsx
const connectWithMetamask = useMetamask();
```

This works because we have the `ThirdwebProvider` setup in our [/pages/app.js](/pages/app.js) file, which allows us to use all of the thirdweb React SDK's helpful hooks.

```jsx
// This is the chainId your dApp will work on.
const activeChainId = ChainId.Rinkeby;

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider desiredChainId={activeChainId}>
      {/* Next Auth Session Provider */}
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </ThirdwebProvider>
  );
}
```

## Connect with Discord

We are using the Authentication library [NextAuth.js](https://next-auth.js.org/) to authenticate users with their Discord accounts.

`NextAuth` uses the [`pages/api/auth/[...nextauth].js`](pages/api/auth/[...nextauth].js) file to handle the authentication logic such as redirects for us.

We setup the Discord Provider and pass in our Discord applications information that we got from the Discord Developer Portal (discussed below).

```jsx
  providers: [
    DiscordProvider({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      authorization: { params: { scope: "identify guilds" } },
    }),
  ],
```

As you can see, we are also requesting additional scope on the user's profile called `identify guilds`.

This is so that we can later make another API request an access which servers the user is a member of.

### Setting Up Your Discord Application

Head to the [Discord Developer portal](https://discord.com/developers/applications) and create a new application.

Under the `Oauth2` tab, copy your client ID and client secret. We need to store these as environment variables in our project so that we can use them on the API routes in our application.

Create a file at the root of your project called `.env.local` and add the following lines:

```bash
CLIENT_ID=<your-discord-client-id-here>
CLIENT_SECRET=<your-discord-client-secret-here>
```

Back in the Discord portal, under the `Redirects` section, you need to add the following value as a redirect URI:

```
http://localhost:3000/api/auth/callback/discord
```

When you deploy to production, you will need to do the same again; and replace the `http://localhost:3000/` with your domain.

In the `SignIn` component, we are importing functions from `next-auth/react` to sign in and out with Discord.

```jsx
import { useSession, signIn, signOut } from "next-auth/react";
```

We then user is signed in, we can access their session information using the `useSession` hook:

```jsx
const { data: session } = useSession();
```

One final detail on the Discord connection is that we have some custom logic to append the `accessToken` to the `session`, so that we can use this to make further API requests. i.e. we need the user's access token to provide to the `Authorization Bearer` when we make the API request to see which servers this user is a part of.

```jsx
// Inside [...nextauth.js]

// When the user signs in, get their token
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },

    // When we ask for session info, also get the accessToken.
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      return session;
    },
  },
```

Now when we call `useSession` or `getSession`, we have access to the `accessToken` of the user; which allows us to make further requests to the Discord API.

## Checking User's Discord Servers

Before the user see's the mint button, we make a check to see if the user is a member of the Discord server, using Next.js API Routes.

This logic is performed on the [pages/api/check-has-role-in-server.js](pages/api/check-has-role-in-server.js) file.

First, we get the user's accessToken from the session.

We use this accessToken to request which servers the user is a member of.

```jsx
// Let's provide a discord server id. We need to switch to developer view on discord to view server aka. guild id.
// Here's how: https://www.alphr.com/discord-find-server-id/
const discordServerId = "";
// Get the Next Auth session so we can use the accessToken as part of the discord API request
const session = await getSession({ req });
// Read the access token from the session
const accessToken = session?.accessToken;



// Make a request to the Discord API to get the servers this user has a certain role. /api/check-has-role-in-server 
const response = await fetch(`https://discordapp.com/api/users/@me/guilds/${discordServerId}/member`, {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

// Parse the response as JSON
const data = await response.json();
```

Now we have all the servers the user is a member of inside the `data` variable. We can filter the array of servers to find the one we are looking for:

```jsx
// well, we're using our serverId
const discordServerId = "";

// Filter all the servers to find the one we want
// Returns undefined if the user is not a member of the server
// Returns the server object if the user is a member
  const jamDiscordMembership = data.roles?.find(
    (role) => role.id === "960299282156625940" // Peace Maker
  );

// Return undefined or the server object to the client.
  res.status(200).json({ jamMembership: jamDiscordMembership ?? undefined });
```
