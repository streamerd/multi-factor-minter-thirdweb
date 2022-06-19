import React from "react";
import { Box, Text, Footer, Anchor } from "grommet";
import { Instagram } from "grommet-icons";

export const AlphaFooter = () => {
  return (
    // <Box fill="vertical" overflow="auto" align="center" flex="grow">
    <Footer
      // align="stretch"
      direction="column"
      flex={false}
      height={""}
    >
      <Box width={"full"} align="stretch" justify="center" direction="row" height={"small"}>
        <Box width={"50%"} background="white">
        <Box align="start" width={"50%"}  justify="center" gap="medium" margin={"medium"}>
          <Text textAlign="start" weight="bold">
            JUSTADDMETA
          </Text>
          <Text size="small" textAlign="start">
            We enable your brand to make a sustainable contribution to the metaverse.
          </Text>
          <Box width={"full"} direction="row">
            <Anchor icon={<Instagram color="black"/>} />
                        <Anchor icon={<Instagram color="black"/>} />
                      <Anchor icon={<Instagram color="black"/>} /> */}

          </Box>
        </Box>
        </Box>
        <Box width={"50%"} background="white">
        <Box align="end" justify="center" margin={"large"} gap="xsmall">
          <Text textAlign="end" size="medium" weight={"bolder"} >
              Justaddsugar GmbH
            </Text>
            <Text textAlign="end" size="small">
              Rothenbaumchaussee 91 
            </Text>
            <Text textAlign="end" size="small">
            20148 Hamburg
            </Text>
            <Text textAlign="end" size="small">
            Germany
            </Text>
            <Text textAlign="end" size="small" >
            +49 176 34990063
            </Text>
            <Text textAlign="end" size="small">
            hello@justaddmeta.com
            </Text>
          </Box>
         
        </Box>
        {/* <Box align="start" width={"50%"}  justify="center" gap="small">
          <Text textAlign="start" weight="bold">
            JUSTADDMETA
          </Text>
          <Text size="small" textAlign="start">
            WE ENABLE YOUR BRAND TO MAKE A SUSTAINABLE CONTRIBUTION TO THE
            METAVERSE.
          </Text>
        </Box>
        <Box align="end" justify="center" gap="small">
          <Box align="end" justify="center">
          <Text textAlign="end" size="small">
              Justaddsugar GmbH
            </Text>
            <Text textAlign="end" size="small">
              Rothenbaumchaussee 91 20148 Hamburg Germany
            </Text>
          </Box>
          <Box align="center" justify="center">
            <Text textAlign="end" size="small">
              +49 176 34990063 hello@justaddmeta.com
            </Text>
          </Box>
        </Box> */}
      </Box>
      {/* <Box
        align="stretch"
        justify="center"
        direction="row"
        background={{ color: "black" }}
        pad="small"
        // gap="small"
        width={"full"}
        height="xxsmall"
      >
        <Text weight="bold" size="small">
          2022 © JUSTADDSUGAR – ALL RIGHTS RESERVED.
        </Text>
      </Box> */}
    </Footer>
    // </Box>
  );
};
