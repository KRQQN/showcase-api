import { Box } from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import { BsTriangleFill, BsSquareFill, BsCircleFill } from "react-icons/bs";
import { Flex } from "@chakra-ui/react";
import { Checkbox } from "@/components/ui/checkbox";

interface IconItem {
  id: number;
  shape: string;
  color: string;
}

const dummyIcons: IconItem[] = [
  { id: 1, shape: "triangle", color: "red" },
  { id: 2, shape: "triangle", color: "blue" },
  { id: 3, shape: "triangle", color: "green" },
  { id: 4, shape: "square", color: "red" },
  { id: 5, shape: "square", color: "blue" },
  { id: 6, shape: "square", color: "green" },
  { id: 7, shape: "circle", color: "red" },
  { id: 8, shape: "circle", color: "blue" },
  { id: 9, shape: "circle", color: "green" },
  { id: 10, shape: "triangle", color: "red" },
  { id: 11, shape: "triangle", color: "blue" },
  { id: 12, shape: "triangle", color: "green" },
  { id: 13, shape: "square", color: "red" },
  { id: 14, shape: "square", color: "blue" },
  { id: 15, shape: "square", color: "green" },
  { id: 16, shape: "circle", color: "red" },
  { id: 17, shape: "circle", color: "blue" },
  { id: 18, shape: "circle", color: "green" },
  { id: 19, shape: "triangle", color: "red" },
  { id: 20, shape: "triangle", color: "blue" },
  { id: 21, shape: "triangle", color: "green" },
  { id: 22, shape: "square", color: "red" },
  { id: 23, shape: "square", color: "blue" },
  { id: 24, shape: "square", color: "green" },
  { id: 25, shape: "circle", color: "red" },
  { id: 26, shape: "circle", color: "blue" },
  { id: 27, shape: "circle", color: "green" },
  { id: 28, shape: "triangle", color: "red" },
  { id: 29, shape: "triangle", color: "blue" },
  { id: 30, shape: "triangle", color: "green" },
  { id: 31, shape: "square", color: "red" },
  { id: 32, shape: "square", color: "blue" },
  { id: 33, shape: "square", color: "green" },
  { id: 34, shape: "circle", color: "red" },
  { id: 35, shape: "circle", color: "blue" },
  { id: 36, shape: "circle", color: "green" },
  { id: 37, shape: "triangle", color: "red" },
  { id: 38, shape: "triangle", color: "blue" },
  { id: 39, shape: "triangle", color: "green" },
  { id: 40, shape: "square", color: "red" },
  { id: 41, shape: "square", color: "blue" },
  { id: 42, shape: "square", color: "green" },
  { id: 43, shape: "circle", color: "red" },
  { id: 44, shape: "circle", color: "blue" },
  { id: 45, shape: "circle", color: "green" },
  { id: 46, shape: "triangle", color: "red" },
  { id: 47, shape: "triangle", color: "blue" },
  { id: 48, shape: "square", color: "green" },
  { id: 49, shape: "circle", color: "red" },
  { id: 50, shape: "square", color: "blue" },
];

const getShapeIcon = (shape: string, size: string = "3rem"): JSX.Element => {
  switch (shape) {
    case "triangle":
      return <BsTriangleFill size={size} />;
    case "square":
      return <BsSquareFill size={size} />;
    case "circle":
      return <BsCircleFill size={size} />;
    default:
      throw new Error(`Unknown shape: ${shape}`);
  }
};

type TShapeFilterOptions = {
  colors: { [key: string]: boolean };
  shapes: { [key: string]: boolean };
};

const Shapes: React.FC = () => {
  const [filter, setFilter] = useState<TShapeFilterOptions>({
    colors: { red: true, blue: true, green: true },
    shapes: { triangle: true, circle: true, square: true },
  });

  const filteredShapes = useMemo(() => {
    return dummyIcons.filter(
      (item) => filter.colors[item.color] && filter.shapes[item.shape],
    );
  }, [filter]);

  return (
    <Box marginTop={"10rem"} w={"20rem"} mx={"auto"}>
      <FilterOptions updateFilter={setFilter} />
      <Flex
        margin={"auto"}
        width={"full"}
        flexWrap={"wrap"}
        gap={"0.5rem"}
        justifyContent={"center"}
      >
        {filteredShapes.map((s) => (
          <Box key={s.id} color={s.color}>
            {getShapeIcon(s.shape)}
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

interface FilterOptionsProps {
  updateFilter: React.Dispatch<React.SetStateAction<TShapeFilterOptions>>;
}

const FilterOptions: React.FC<FilterOptionsProps> = ({ updateFilter }) => {
  const colors = ["red", "green", "blue"];
  const shapes = ["square", "circle", "triangle"];

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<any>) => {
      updateFilter((prev) => ({
        ...prev,
        [e.target.name]: {
          ...prev[e.target.name as keyof TShapeFilterOptions],
          [e.target.value]: e.target.checked,
        },
      }));
    },
    [updateFilter],
  );
  return (
    <Flex gap="1rem" p="1rem" justifyContent="space-evenly">
      <Flex flexDir={"column"} gap={"1rem"} justifyContent={"space-evenly"}>
        {colors.map((c) => (
          <Flex gap="1rem" alignItems="center">
            <Checkbox
              id={c}
              value={c}
              bg="white"
              name="colors"
              defaultChecked={true}
              onChange={handleChange}
            />
            <Box as="label" display="flex" alignItems="center" minWidth="60px">
              {c}
            </Box>
          </Flex>
        ))}
      </Flex>
      <Flex flexDir={"column"} gap={"1rem"} justifyContent={"space-evenly"}>
        {shapes.map((s) => (
          <Flex gap="1rem" alignItems="center">
            <Checkbox
              id={s}
              value={s}
              bg="white"
              name="shapes"
              defaultChecked={true}
              onChange={handleChange}
            />
            <Box as="label" display="flex" alignItems="center" minWidth="60px">
              {s}
            </Box>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default Shapes;
