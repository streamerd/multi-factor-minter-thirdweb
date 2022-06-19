
import {
  Image,
  Spinner,
  Card,
  Box,
  Button,
  Text,
  Heading,
  Paragraph,
} from "grommet";
export default function AuthOnly() {
  return (
    <Box align="center" justify="center">
      <Card
        align="stretch"
        justify="center"
        direction="column"
        pad="large"
        gap="small"
      >
        <Box
          align="center"
          justify="center"
          pad="xsmall"
          direction="column"
          gap="small"
        >
          <Text textAlign="center">AUTHORIZED ACCESS ONLY</Text>
          <Paragraph textAlign="center">
            You need to connect your metamask wallet to Alpha mint.
          </Paragraph>
        </Box>
        <Box align="stretch" justify="center" pad="small" gap="small">
          <Button
            label="Connect Wallet"
            size="medium"
            primary
            onClick={() => connectWithMetamask()}
          />
          <Button label="Launch" active={false} disabled size="medium" />
        </Box>
      </Card>
    </Box>
  );
}
