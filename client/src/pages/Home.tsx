import FrenchBulldog from '@/components/custom/frenchie';
import CardScrollList from '@/components/custom/cardScrollList';
import TrNameLanguage from '@/components/custom/TypewriterNameLanguage';
import WaveDivider from '@/components/layout/waveDivider';
import { Box,  Stack } from '@chakra-ui/react';

const Home = () => {
  return (
    <>
      <Box
        w={'100vw'}
        h={{ smDown: '150vh', sm: '120vh', md: '200vh', lg: '200vh' }}
        className="pattern gradient-bg se-yellow ua-blue"
      >
        <FrenchBulldog />
        <TrNameLanguage />
      </Box>

      <Stack gap={0} bg={'#0066cc'} h={'20rem'}>
        <WaveDivider color="#FFD700" height="full" width="100vw" />

        <Box
          h={'100%'}
          flex={'auto'}
          justifyContent={'center'}
          alignContent={'center'}
          bg="linear-gradient(0deg, #242424 0%, #0066cc 80%)"
        >
          <Box bg="none" rounded={'xl'} mt={'2rem'} zIndex={40}>
            <Box h={'50rem'} pt={'10rem'}>
              <CardScrollList />
            </Box>
          </Box>
        </Box>
      </Stack>
    </>
  );
};

export default Home;