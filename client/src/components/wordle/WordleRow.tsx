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
            m={2}
            key={i}
            h={70}
            w={70}
          >
            <Text
              textShadow="0px 0px 3px whiteSmoke"
              color={'black'}
              textAlign={'center'}
              fontWeight={'bolder'}
              fontSize={40}
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
