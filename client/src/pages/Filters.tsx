import { Box } from "@chakra-ui/react";
import React from "react";
import { BsTriangleFill, BsSquareFill, BsCircleFill } from "react-icons/bs";
import { Flex } from "@chakra-ui/react";

const size = "4rem";

const dummyShapes = [
  { id: 1, shape: <BsTriangleFill size={size} />, color: "red" },
  { id: 2, shape: <BsTriangleFill size={size} />, color: "blue" },
  { id: 3, shape: <BsTriangleFill size={size} />, color: "green" },
  { id: 4, shape: <BsSquareFill size={size} />, color: "red" },
  { id: 5, shape: <BsSquareFill size={size} />, color: "blue" },
  { id: 6, shape: <BsSquareFill size={size} />, color: "green" },
  { id: 7, shape: <BsCircleFill size={size} />, color: "red" },
  { id: 8, shape: <BsCircleFill size={size} />, color: "blue" },
  { id: 9, shape: <BsCircleFill size={size} />, color: "green" },
  { id: 10, shape: <BsTriangleFill size={size} />, color: "red" },
  { id: 11, shape: <BsTriangleFill size={size} />, color: "blue" },
  { id: 12, shape: <BsTriangleFill size={size} />, color: "green" },
  { id: 13, shape: <BsSquareFill size={size} />, color: "red" },
  { id: 14, shape: <BsSquareFill size={size} />, color: "blue" },
  { id: 15, shape: <BsSquareFill size={size} />, color: "green" },
  { id: 16, shape: <BsCircleFill size={size} />, color: "red" },
  { id: 17, shape: <BsCircleFill size={size} />, color: "blue" },
  { id: 18, shape: <BsCircleFill size={size} />, color: "green" },
  { id: 19, shape: <BsTriangleFill size={size} />, color: "red" },
  { id: 20, shape: <BsTriangleFill size={size} />, color: "blue" },
  { id: 21, shape: <BsTriangleFill size={size} />, color: "green" },
  { id: 22, shape: <BsSquareFill size={size} />, color: "red" },
  { id: 23, shape: <BsSquareFill size={size} />, color: "blue" },
  { id: 24, shape: <BsSquareFill size={size} />, color: "green" },
  { id: 25, shape: <BsCircleFill size={size} />, color: "red" },
  { id: 26, shape: <BsCircleFill size={size} />, color: "blue" },
  { id: 27, shape: <BsCircleFill size={size} />, color: "green" },
  { id: 28, shape: <BsTriangleFill size={size} />, color: "red" },
  { id: 29, shape: <BsTriangleFill size={size} />, color: "blue" },
  { id: 30, shape: <BsTriangleFill size={size} />, color: "green" },
  { id: 31, shape: <BsSquareFill size={size} />, color: "red" },
  { id: 32, shape: <BsSquareFill size={size} />, color: "blue" },
  { id: 33, shape: <BsSquareFill size={size} />, color: "green" },
  { id: 34, shape: <BsCircleFill size={size} />, color: "red" },
  { id: 35, shape: <BsCircleFill size={size} />, color: "blue" },
  { id: 36, shape: <BsCircleFill size={size} />, color: "green" },
  { id: 37, shape: <BsTriangleFill size={size} />, color: "red" },
  { id: 38, shape: <BsTriangleFill size={size} />, color: "blue" },
  { id: 39, shape: <BsTriangleFill size={size} />, color: "green" },
  { id: 40, shape: <BsSquareFill size={size} />, color: "red" },
  { id: 41, shape: <BsSquareFill size={size} />, color: "blue" },
  { id: 42, shape: <BsSquareFill size={size} />, color: "green" },
  { id: 43, shape: <BsCircleFill size={size} />, color: "red" },
  { id: 44, shape: <BsCircleFill size={size} />, color: "blue" },
  { id: 45, shape: <BsCircleFill size={size} />, color: "green" },
  { id: 46, shape: <BsTriangleFill size={size} />, color: "red" },
  { id: 47, shape: <BsTriangleFill size={size} />, color: "blue" },
  { id: 48, shape: <BsSquareFill size={size} />, color: "green" },
  { id: 49, shape: <BsCircleFill size={size} />, color: "red" },
  { id: 50, shape: <BsSquareFill size={size} />, color: "blue" },
];

//type TShape = {id:string; shape: ReactNode; color: string;}
const Filters: React.FC = () => {
  //const [shapes, setShapes] = useState(dummyShapes)

  return (
    <Flex margin={"10rem auto"} width={"20rem"} flexWrap={"wrap"}>
      {dummyShapes.map((s) => {
        return (
          <Box key={s.id} width={size} color={s.color}>
            {s.shape}
          </Box>
        );
      })}
    </Flex>
  );
};
export default Filters;
