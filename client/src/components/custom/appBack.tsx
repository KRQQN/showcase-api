import './App.css';
import { Box, HStack, Link, Stack, Strong } from '@chakra-ui/react';
import Header from '../custom/header';
import {
  HoverCardArrow,
  HoverCardContent,
  HoverCardRoot,
  HoverCardTrigger
} from '../ui/hover-card';
import { useState } from 'react';

const content = ['content 1', 'content 2', 'content 3'];

function App() {
  const [open, setOpen] = useState(false);
  return (
    <Stack gap={0}>
      <Header />
      <Box h={{ base: 500, md: 300, lg: 500}} bg={'gray.200'} alignContent={'center'}>
        <Box
        position={'relative'}
          bg="blackAlpha.950/95"
          rounded={'xl'}
          w={{ base: '97%', md: '95%', lg: '60%', sm: '97%' }}
          h={{ base: '70%', md: '80%', lg: '75%' }}
          m={'auto'}
          zIndex={40}
        >
          <HStack
            justify={'center'}
            align={'center'}
            h={'100%'}
            p={5}
            flexDirection={{ base: 'column', md: 'row' }}
          >
            {content.map((item, index) => (
              <Box
                key={index}
                _hover={{
                  bg: 'blackAlpha.950',
                  transform: 'scale(1.05)',
                  transition: 'all 0.4s ease'
                }}
                bg={'blackAlpha.700'}
                rounded={'md'}
                w={{ base: '90%', md: '30%', lg: '27%' }}
                h={{ base: '20%', md: '60%', lg: '85%' }}
                m={2}
                zIndex={100}
              >
                {item}
              </Box>
            ))}
          </HStack>
          <Box
            w={'full'}
            h={'full'}
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
          >
          </Box>
        </Box>
      </Box>

      <Box h={{ base: 200, md: 350 }}>
        <HoverCardRoot size="sm" open={open} onOpenChange={(e: { open: boolean }) => setOpen(e.open)}>
          <HoverCardTrigger asChild>
            <Link href="#">@chakra_ui</Link>
          </HoverCardTrigger>
          <HoverCardContent maxWidth="240px">
            <HoverCardArrow />
            <Box>
              <Strong>Chakra</Strong> is a Sanskrit word that means disk or wheel,
              referring to energy centers in the body
            </Box>
          </HoverCardContent>
        </HoverCardRoot>
      </Box>

      <Box w={'100vw'} h={'200px'} bg={'gray.200'} position={'relative'}>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          w="300px"
          p="20px"
          bg="rgba(0, 0, 0, 0.3)" // Red with 80% opacity
          color="white"
          textAlign="center"
          borderRadius="10px"
          zIndex={10}
        >
          <h1>hello</h1>
        </Box>
      </Box>
    </Stack>
  );
}

export default App;
