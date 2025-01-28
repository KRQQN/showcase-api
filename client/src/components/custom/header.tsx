import { Box, Flex, Heading, Spacer, Button } from "@chakra-ui/react";

function Header() {
  return (
    <Box bg="blue.500" color="white" px={4} py={3}>
      <Flex align="center">
        <Heading size="md">*Some logo*</Heading>
        <Spacer />
        <Button variant="outline" colorScheme="whiteAlpha" size="sm">
          Login
        </Button>
      </Flex>
    </Box>
  );
}

export default Header;