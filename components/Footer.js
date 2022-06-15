import React from "react";
import { Box, Text, Footer } from "grommet";

export const AlphaFooter = () => {
  return (
    // <Box fill="vertical" overflow="auto" align="center" flex="grow">
    <Footer
      // align="stretch"
      direction="column"
      flex={false}
      justify="start"
      gap="medium"
    >
      <Box
        align="stretch"
        justify="center"
        direction="row"
        gap="small"
         pad="small"
         width={"full"}
      >
        <Box align="start"  justify="center" gap="small">
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
        </Box>
      </Box>
      <Box
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
      </Box>
    </Footer>
    // </Box>
  );
};
