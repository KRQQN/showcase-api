import './App.css';
import { Box, HStack, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import FrenchBulldog from './components/custom/frenchie';
import { AnimatePresence, motion, MotionStyle } from 'framer-motion';

const content = ['content 1', 'content 2', 'content 3'];

function App() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Box
        w={'100vw'}
        h={'100vh'}
        background={'linear-gradient(180deg, #0057B7 65%, #FFD700 100%)'}
      >
        <FrenchBulldog />

        {/* text-container */}
        <Box
          id="name-title"
          textAlign={'left'}
          width={{ base: '90%', lg: '35%' }}
          margin={'auto'}
          position={{ base: 'absolute', md: 'static', lg: 'absolute' }}
          top={{ lg: '56%', md: '30%' }}
          left={{ lg: '75%', md: '50%' }}
          transform={{ md: 'translate(40%, -180%)', lg: 'translate(-90%, -180%)' }}
        >
          <NameTitle />
      
        </Box>
      </Box>

      <Stack gap={0} bg={'#0057B7'} h={'full'}>
        <WaveDivider color="#FFD700" height="202px" width="100vw" />
        {/* <Header /> */}
        <Box
          h={{ base: '100%', md: 400, lg: 500, sm: '100%' }}
          flex={'auto'}
          justifyContent={'center'}
          alignContent={'center'}
          bg="blackAlpha.350"
        >
          <Box
            bg="blackAlpha.600"
            rounded={'xl'}
            flex={'auto'}
            mx={{base:'1rem', sm: '2rem', lg: '10rem'}}
            mt={'2rem'}
            zIndex={40}
          >
            <HStack
              justify={'center'}
              alignItems={'center'}
              h={'40rem'}
              p={5}
              flexDirection={{ base: 'column', md: 'row' }}
            >
              {content.map((item, index) => (
                <Box
                  key={index}
                  _hover={{
                    bg: 'rgba(34, 193, 195, 0.8)',
                    transform: 'scale(1.05)',
                    transition: 'all 0.4s ease'
                  }}
                  bg={'rgba(255, 255, 255, 0.1)'}
                  rounded={'md'}
                  w={{ base: '90%', md: '30%', lg: '27%', sm: '90%' }}
                  h={{ base: '40%', md: '60%', lg: '85%', sm: '20rem' }}
                  m={2}
                  zIndex={100}
                >
                  {item}
                </Box>
              ))}
            </HStack>
          </Box>
        </Box>

        <Box>
          
        </Box>


        {/* <ScrollAnimations /> */}

      </Stack>
    </>
  );
}



const SlidingText = ({
  children,
  text,
  from,
  duration,
  style,
  delay = 0
}: {
  text?: string;
  from: 'left' | 'right';
  duration: number;
  style: MotionStyle;
  delay?: number;
  typewriter?: boolean;
  children?: React.ReactNode;
}) => {
  const direction = from === 'left' ? '-100vw' : '100vh';
  return (
    <motion.div
      initial={{ x: direction, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'tween', duration, delay }}
      style={style}
    >
      {children ? children : text}
    </motion.div>
  );
};



const SwipeText = ({ word, duration = 2 }: { word: string; duration: number }) => {
  return (
    <div style={{ height: '50px', overflow: 'hidden' }}>
      <AnimatePresence>
        <motion.div
          key={word}
          initial={{ y: '-80%', opacity: 0 }}
          animate={{ y: '0%', opacity: 0.8 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ duration: duration, type: 'tween' }}
          style={{
            translateY: '-5px',
            position: 'absolute',
            width: '100%',
            textAlign: 'left',
            fontSize: '24px',
            fontWeight: 'bold'
          }}
        >
          {word}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const NameTitle = () => {
  const [visible, setVisible] = useState<boolean>();

  return (
    <>
      <SlidingText
        duration={1}
        from="right"
        typewriter={true}
        style={{ fontSize: '2.8rem', fontWeight: 'bold', color: '#ffffff' }}
        children={
          <Typewriter
            words={['Робін Крон', 'Robin kron']}
            loop={1}
            cursor
            cursorStyle="|"
            typeSpeed={55}
            deleteSpeed={15}
            delaySpeed={2000}
            onDelay={() => {
              setVisible(true);
            }}
          />
        }
      />

      <SwipeText word={visible ? 'Fullstack Developer' : ''} duration={0.2} />
    </>
  );
};

const WaveDivider = ({ color = '#9c9b9b', height = '62px', width = '100%' }) => {
  return (
    <div style={{ overflow: 'hidden' }}>
      <svg
        preserveAspectRatio="none"
        viewBox="0 0 1200 120"
        xmlns="http://www.w3.org/2000/svg"
        style={{ fill: color, width: width, height: height }}
      >
        <path
          d="M0 0v46.29c47.79 22.2 103.59 32.17 158 28 70.36-5.37 136.33-33.31 206.8-37.5 73.84-4.36 147.54 16.88 218.2 35.26 69.27 18 138.3 24.88 209.4 13.08 36.15-6 69.85-17.84 104.45-29.34C989.49 25 1113-14.29 1200 52.47V0z"
          opacity=".25"
        />
        <path
          d="M0 0v15.81c13 21.11 27.64 41.05 47.69 56.24C99.41 111.27 165 111 224.58 91.58c31.15-10.15 60.09-26.07 89.67-39.8 40.92-19 84.73-46 130.83-49.67 36.26-2.85 70.9 9.42 98.6 31.56 31.77 25.39 62.32 62 103.63 73 40.44 10.79 81.35-6.69 119.13-24.28s75.16-39 116.92-43.05c59.73-5.85 113.28 22.88 168.9 38.84 30.2 8.66 59 6.17 87.09-7.5 22.43-10.89 48-26.93 60.65-49.24V0z"
          opacity=".5"
        />
        <path d="M0 0v5.63C149.93 59 314.09 71.32 475.83 42.57c43-7.64 84.23-20.12 127.61-26.46 59-8.63 112.48 12.24 165.56 35.4C827.93 77.22 886 95.24 951.2 90c86.53-7 172.46-45.71 248.8-84.81V0z" />
      </svg>
    </div>
  );
};

export default App;
