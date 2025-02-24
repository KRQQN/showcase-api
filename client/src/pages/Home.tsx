import FrenchBulldog from '@/components/custom/frenchie';
import CardScrollList from '@/components/custom/cardScrollList';
import TrNameLanguage from '@/components/custom/TypewriterNameLanguage';
import { Box, Stack } from '@chakra-ui/react';
import ColorFramedBox from '@/components/custom/colorFramedBox';
import { motion } from 'framer-motion';
import './home.scss';

const Home = () => {
  return (
    <Box className="bg_grad">
      <Box w={'100vw'} h={{ base: '100vh', smDown: '130vh' }}>
        <FrenchBulldog />
        <TrNameLanguage />
      </Box>


      <Box w={'60%'} m={'auto'}>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: -200, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <ColorFramedBox>
            <Box>
              <p>Hi, I'm a Full Stack Developer</p>
            </Box>
          </ColorFramedBox>
        </motion.div>
      </Box>


      <Stack gap={0} h={'50rem'}>


        <Box
          h={'100%'}
          flex={'auto'}
          justifyContent={'center'}
          alignContent={'center'}
        >

              <CardScrollList />

        </Box>
      </Stack>
    </Box>
  );
};

export default Home;
