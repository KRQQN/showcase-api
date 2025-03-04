import { useState } from "react";
import { SlidingText, SwipeText } from "./textAnimations";
import { Typewriter } from "react-simple-typewriter";
import { Box } from "@chakra-ui/react";

const TrNameLanguage = () => {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  const wordPairs = [
    { flag: '🇺🇸', text: 'Full-stack developer' },
    { flag: '🇪🇸', text: 'Desarrollador full-stack' },
    { flag: '🇺🇦', text: 'Фулстек девелопер' },
    { flag: '🇸🇪', text: 'Full-stack utvecklare' },
  ];

  return (
    <Box
          id="name-title"
          textAlign={'left'}
          width={{  lg: '35%', md: '50%', smDown: '90%' }}
          margin={'auto'}
          position={{ base: 'absolute', md: 'static', lg: 'absolute' }}
          top={{ lg: '56%', md: '30%' }}
          left={{ lg: '75%', md: '50%' }}
          transform={{ md: 'translate(12rem, -11rem)', lg: 'translate(-20rem -10rem)' }}
        >
      <SwipeText word={visible ? 'Robin Kron' : ''} duration={0.8} />
      <SlidingText
        duration={1}
        from="right"
        typewriter={true}
        style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#ffffff' }}
        children={
          <>
            <span>{wordPairs[index].flag}</span>&nbsp;
            <Typewriter
              words={wordPairs.map((e) => e.text)}
              loop={3}
              cursor
              cursorStyle="|"
              typeSpeed={25}
              deleteSpeed={25}
              delaySpeed={2000}
              onType={(it) => {
                setIndex(it % wordPairs.length);
              }}
              onDelay={() => setVisible(true)}
            />
          </>
        }
      />
    </Box>
  );
};

export default TrNameLanguage;