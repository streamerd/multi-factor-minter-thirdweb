import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { SessionProvider } from "next-auth/react";
import { Grommet} from "grommet";
import { grommet } from "grommet";
import Head from "next/head";
import { useState } from "react";
import "../styles/globals.css";

// This is the chainId your dApp will work on.
const activeChainId = ChainId.Rinkeby;

function MyApp({ Component, pageProps }) {
  return (
    <Grommet full>

    <ThirdwebProvider desiredChainId={activeChainId}>
      {/* Next Auth Session Provider */}
      <SessionProvider session={pageProps.session}>
        <Head>
          <title>Heimdall</title>
        </Head>
        <Component {...pageProps} />
      </SessionProvider>
    </ThirdwebProvider>
    </Grommet>
  );
}

export default MyApp;
