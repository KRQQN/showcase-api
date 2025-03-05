import FrenchBulldog from '@/components/custom/frenchie';
import CardScrollList from '@/components/custom/cardScrollList';
import TrNameLanguage from '@/components/custom/TypewriterNameLanguage';
import { Box, Stack, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import './home.scss';
import Terminal from '@/components/custom/terminal';
import { useState } from 'react';

const Home = () => {

  return (
    <Box className="bg_grad">
      <Box w={'100vw'} h={{ base: '40rem', smDown: '50rem' }}>
        <FrenchBulldog />
        <TrNameLanguage />
      </Box>

      <Box w={'100%'} h={'20rem'}>
        <motion.div
          initial={{ y: 0, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.9 }}
        >
         <Showcase />
        </motion.div>
      </Box>

      <Stack gap={0} h={'50rem'}>
        <Box h={'100%'} justifyContent={'center'} alignContent={'center'}>
          <Showcase />
        </Box>
      </Stack>
    </Box>
  );
};

const Showcase = () => {
  const [showTerminal, setShowTerminal] = useState<boolean>(true);
  return (
    <>
      <Text fontSize={50} mt={500} letterSpacing={'10px'}>
        SHOWCASE
      </Text>
      {showTerminal ? (
        <Terminal showTerminal={() => setShowTerminal(!showTerminal)} />
      ) : (
        <CardScrollList />
      )}
    </>
  );
};

export default Home;
