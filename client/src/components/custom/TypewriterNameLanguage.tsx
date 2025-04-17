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
          textAlign={'left'}
          ml={{mdDown:'10rem'}}
          width={{  lgDown: '25rem' }}
          textWrap={'nowrap'}
          alignSelf={{base:'end', mdDown:'center'}}
          transform={{base: 'translateY(-10rem)', mdDown:'translateY(-2rem)'}}




        >
      <SwipeText word={visible ? 'Robin Kron' : ''} duration={0.8} />
      <SlidingText
        duration={1}
        from="right"
        typewriter={true}
        style={{ fontSize: '1.5em', fontWeight: 'bold', color: '#ffffff' }}
        children={
          <>
            <span>{wordPairs[index].flag}</span>&nbsp;
            <Typewriter
            
              words={wordPairs.map((e) => e.text)}
              loop={2}
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