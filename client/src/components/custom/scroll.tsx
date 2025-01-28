/* import React from "react";
import { Box, Flex, Text, VStack, Container } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const MotionBox = motion(Box as any);

const Card: React.FC<{ text: string }> = ({ text }) => {
  const { ref, inView } = useInView({ threshold: 1, triggerOnce: true });

  return (
    <MotionBox
      ref={ref}
      p={5}
      shadow="md"
      borderWidth="1px"
      rounded="md"
      bg="blue.500"
      color="white"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 2 }}
    >
{      <Text>{text}</Text>
    </MotionBox>}
  );
};

const ScrollRevealExample: React.FC = () => {
  return (
    <Container maxW="container.md" py={20}>
      <VStack gap={10}>
        <Card text="First Card - I slide in!" />
        <Card text="Second Card - Me too!" />
        <Card text="Third Card - Don't forget me!" />
      </VStack>
    </Container>
  );
};

export default ScrollRevealExample;
 */


/* 
import React, { useCallback } from "react";

import { Box, Text, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Particles, { initParticlesEngine }from "@tsparticles/preact";
import { loadFull } from "tsparticles";

const MotionBox = motion(Box as any);

const MatrixRain: React.FC = () => {
  // tsParticles initialization
  const particlesInit = useCallback(async (engine: any) => {
    await loadFull(engine);
  }, []);

  const particleOptions = {
    background: {
      color: { value: "#000000" }, // Black background
    },
    particles: {
      color: {
        value: ["#00FF00", "#00CC00", "#008000"], // Matrix green shades
      },
      links: {
        enable: false,
      },
      move: {
        enable: true,
        speed: 5,
        direction: "bottom" as const,
        outModes: {
          default: "out" as const,
        },
      },
      number: {
        value: 200,
        density: {
          enable: true,
          area: 800,
        },
      },
      opacity: {
        value: 0.6,
      },
      size: {
        value: { min: 1, max: 5 },
      },
    },
    fullScreen: { enable: true },
  };

  return (
    <Box position="relative" h="100vh" w="100vw" overflow="hidden">
      {/* Matrix Rain using react-tsparticles */}
      <Particles id="tsparticles" init={particlesInit} options={particleOptions} />

      {/* Content Layer */}
      <Flex
        direction="column"
        align="center"
        justify="center"
        h="100%"
        zIndex="10"
        position="relative"
      >
        <MotionBox
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          bg="blackAlpha.700"
          p={10}
          rounded="lg"
          shadow="xl"
        >
          <Text fontSize="4xl" fontWeight="bold" color="green.300">
            Welcome to the Matrix
          </Text>
          <Text fontSize="lg" color="gray.300" mt={4}>
            Scroll, hover, and interact with the simulation.
          </Text>
        </MotionBox>
      </Flex>
    </Box>
  );
};

export default MatrixRain;
 */