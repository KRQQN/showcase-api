import { Flex } from "@chakra-ui/react";
import { LetterFeedback, StatusColors } from "@/types/wordleTypes";
import LetterFeedbackBox from "./LetterFeedbackBox";

type WordleRowProps = {
  word: string;
  feedback: LetterFeedback[] | null;
  wordLength: number;
};

const WordleRow: React.FC<WordleRowProps> = ({
  word,
  feedback,
  wordLength,
}) => {
  return (
    <Flex justify={"center"}>
      {[...word.padEnd(wordLength)].map((letter, i) => {
        const status = feedback ? feedback[i]?.status : "";
        return (
          <LetterFeedbackBox
            key={i}
            letter={letter}
            status={
              StatusColors[status as keyof typeof StatusColors] ||
              StatusColors.default
            }
          />
        );
      })}
    </Flex>
  );
};

export default WordleRow;
