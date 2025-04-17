import { Box, Text } from '@chakra-ui/react';

const LetterFeedbackBox = ({
  letter,
  status
}: {
  letter: string;
  status: string;
}) => {
  return (
    <Box
      bg={status}
      alignContent={'center'}
      borderRadius={10}
      m={{ base: 2, mdDown: 1 }}
      h={{ base: 70, mdDown: 45 }}
      w={{ base: 70, mdDown: 45 }}
    >
      <Text
        textShadow="0px 0px 1px whiteSmoke"
        color={'black'}
        textAlign={'center'}
        fontWeight={'bolder'}
        fontSize={{ base: '4xl', mdDown: '2xl' }}
      >
        {letter}
      </Text>
    </Box>
  );
};

export default LetterFeedbackBox;
