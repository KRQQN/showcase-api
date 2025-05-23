import FrenchBulldog from "@/components/custom/frenchie";
import CardScrollList from "@/components/custom/cardScrollList";
import TrNameLanguage from "@/components/custom/TypewriterNameLanguage";
import { Box, Flex, Stack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import "./home.scss";
import Terminal from "@/components/custom/terminal";
import { useState } from "react";
import BackgroundLayout from "@/components/layout/bg";

const Home = () => {
  const [showTerminal, setShowTerminal] = useState<boolean>(true);

  return (
    <BackgroundLayout>
      <Box h={"full"}>
        <Flex
          minW={"25rem"}
          minH={{ base: "60rem", mdDown: "20rem" }}
          maxH={{ base: "80rem", mdDown: "20rem" }}
          my={{ base: "2rem", mdDown: "10rem" }}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Flex
            id="name"
            flexDir={{ mdDown: "column" }}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <FrenchBulldog />
            <TrNameLanguage />
          </Flex>
        </Flex>
        <Box w={"100%"} h={"20rem"} mx={"auto"}>
          <motion.div
            initial={{ y: 0, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, amount: "all" }}
          >
            <>
              {showTerminal ? (
                <Terminal toggleGUI={() => setShowTerminal(!showTerminal)} />
              ) : (
                <CardScrollList
                  toggleGUI={() => setShowTerminal(!showTerminal)}
                />
              )}
            </>
          </motion.div>
        </Box>

        <Stack gap={0} h={"50rem"}>
          <Box
            h={"100%"}
            justifyContent={"center"}
            alignContent={"center"}
          ></Box>
        </Stack>
      </Box>
    </BackgroundLayout>
  );
};

export default Home;
