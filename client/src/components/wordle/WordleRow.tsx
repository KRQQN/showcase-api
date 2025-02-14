import { Box, Flex, Text } from '@chakra-ui/react';
import { LetterFeedback, StatusColors } from './types/wordleTypes';

type WordleRowProps = {
    word: string;
    feedback: LetterFeedback[] | null;
  }

const WordleRow: React.FC<WordleRowProps> = ({ word, feedback }) => {
  return (
    <Flex justify={'center'}>
      {[...word.padEnd(6)].map((letter, i) => {
        const status = feedback ? feedback[i]?.status : '';
        return (
          <Box
            bg={
              StatusColors[status as keyof typeof StatusColors] ||
              StatusColors.default
            }
            alignContent={'center'}
            borderRadius={10}
            key={i}
            m={{base: 2, mdDown: 1}}
            h={{base: 70, mdDown: 45}}
            w={{base: 70, mdDown: 45}}
          >
            <Text
              textShadow="0px 0px 1px whiteSmoke"
              color={'black'}
              textAlign={'center'}
              fontWeight={'bolder'}
              fontSize={{base: '4xl', mdDown: '2xl'}}
            >
              {letter}
            </Text>
          </Box>
        );
      })}
    </Flex>
  );
};

export default WordleRow;
