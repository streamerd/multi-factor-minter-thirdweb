
import {
  Image,
  Box,
  Button,
  Text,
  Heading,
} from "grommet";

export default function Welcome(props) {
  console.log(`mintingStarted>> ${this.props.mintindStarted.toString()}`)
  return  (
<>
<Box
        width={"50%"}
        background="black"
        justify="center"
        align="end"
        pad={"large"}
      >
        <Image width={"460px"} height={"500px"}></Image>
      </Box>
      <Box width={"50%"} background="black" pad={"32px"} justify="center">
        <Box direction="column" pad={"xsmall"}>
          <Text size="large" textAlign="start">
            SUMMERJAM NFT
          </Text>
          <Heading size="medium" textAlign="start" color={"#e326cc"}>
            SOME LONGER AND BIGGER HEADING
          </Heading>
        </Box>

        <Box direction="column" margin={"small"} gap={"medium"}>
          <Text textAlign="start">
            We are happy to announce the first holistic drop to our
            JUSTADDMETA collection. It is our most ambitious project to date
            and took a lot of planning, designing and technological
            development. It is the beginning of our own ecosystem, with much
            more to come.
          </Text>

          <Text textAlign="start">
            In order to celebrate the name & everyone behind the vision, we
            decided to drop a collection of limited edition NFTs. Those who
            are lucky enough to get their hands on one of the just 50 jam NFTs
            are in for an interesting ride through the metaverse and our
            vision of it. The journey has only begun. Look out for new drops &
            hidden features.
          </Text>
          <Box>

    



            <Button
              alignSelf="start"
              label="Start Minting"
              size="large"
              onClick={() => (console.log(`Start Minting clicked`))}
            />
          </Box>
        </Box>
      </Box>
</>
  );
    
}
