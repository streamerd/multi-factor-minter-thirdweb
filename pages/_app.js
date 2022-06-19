import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { Grommet} from "grommet";
import Head from "next/head";
import "../styles/globals.css";

// This is the chainId your dApp will work on.
const activeChainId = ChainId.Rinkeby;

const theme = {
  "global": {
    "colors": {
      "background": {
        "light": "#ffffff",
        "dark": "#000000"
      }
    },
    "font": {
      "family": "-apple-system,\n         BlinkMacSystemFont, \n         \"Segoe UI\", \n         Roboto, \n         Oxygen, \n         Ubuntu, \n         Cantarell, \n         \"Fira Sans\", \n         \"Droid Sans\",  \n         \"Helvetica Neue\", \n         Arial, sans-serif,  \n         \"Apple Color Emoji\", \n         \"Segoe UI Emoji\", \n         \"Segoe UI Symbol\""
    }
  },
  "button": {
    "extend": [
      null
    ]
  }
}

function MyApp({ Component, pageProps }) {
  return (
    <Grommet full theme={theme}>

    <ThirdwebProvider desiredChainId={activeChainId}>
      {/* Next Auth Session Provider */}
      {/* <SessionProvider session={pageProps.session}> */}
        <Head>
          <title>Alpha Minting</title>
        </Head>
        <Component {...pageProps} />
      {/* </SessionProvider> */}
    </ThirdwebProvider>
    </Grommet>
  );
}

export default MyApp;
