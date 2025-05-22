import "./scrollList.scss";
import { Flex, Link } from "@chakra-ui/react";
import { useRef, useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const CardScrollList: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [leftArrowOpacity, setLeftArrowOpacity] = useState(0); // Start transparent
  const [rightArrowOpacity, setRightArrowOpacity] = useState(0.5); // Start visible

  const updateArrowVisibility = () => {
    const container = containerRef.current;
    if (!container) return;

    const isAtStart = container.scrollLeft === 0;
    const isAtEnd =
      container.scrollLeft + container.offsetWidth >= container.scrollWidth - 1; // Small buffer for precision

    setLeftArrowOpacity(isAtStart ? 0 : 0.5);
    setRightArrowOpacity(isAtEnd ? 0 : 0.5);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isDragging = false;
    let startX: number;
    let scrollLeft: number;

    const startDragging = (e: MouseEvent) => {
      isDragging = true;
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    };

    const stopDragging = () => {
      isDragging = false;
    };

    const onDrag = (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 2.5;
      container.scrollLeft = scrollLeft - walk;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      container.scrollLeft += e.deltaY;
    };

    const handleScroll = () => {
      updateArrowVisibility();
    };

    container.addEventListener("mousedown", startDragging);
    container.addEventListener("mousemove", onDrag);
    container.addEventListener("mouseup", stopDragging);
    container.addEventListener("mouseleave", stopDragging);
    container.addEventListener("wheel", handleWheel);
    container.addEventListener("scroll", handleScroll);

    // Initial check for arrow visibility
    updateArrowVisibility();

    return () => {
      container.removeEventListener("mousedown", startDragging);
      container.removeEventListener("mousemove", onDrag);
      container.removeEventListener("mouseup", stopDragging);
      container.removeEventListener("mouseleave", stopDragging);
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollLeft = () => {
    const container = containerRef.current;
    if (container) {
      container.scrollLeft -= container.offsetWidth * 1;
      updateArrowVisibility();
    }
  };

  const scrollRight = () => {
    const container = containerRef.current;
    if (container) {
      container.scrollLeft += container.offsetWidth * 1;
      updateArrowVisibility();
    }
  };

  return (
    <Flex
      className="container"
      maxW={{ base: "30rem", md: "40rem", lg: "60rem" }}
      maxH={"30rem"}
      m={"auto"}
      position={"relative"}
      alignItems={"center"}
    >
      <FaChevronLeft
        id="slider-btn-l"
        size={"6rem"}
        opacity={leftArrowOpacity}
        color={"whiteSmoke"}
        onClick={scrollLeft}
        style={{ transition: "opacity 0.3s ease-in-out" }}
      />
      <div id="slider-ctr" className="container" ref={containerRef}>
        <Link className="item" href="/wordle" textDecoration="none">
          <div>
            <div className="item-image">
              <img src="/wordle.png" alt="Wordle" />
            </div>
            <div className="item-title">WORDLE</div>
            <div className="item-desc">
              <p>Play a game of wordle with the word length of your choice!</p>
              <p>Can you make it to the high-score leaderboard?</p>
            </div>
          </div>
        </Link>
        <Link className="item" href="/filtering" textDecoration="none">
          <div className="item-image">
            <img src="/boxes.png" alt="Content" />
          </div>
          <div className="item-title">Filtering</div>
          <div className="item-desc">
            <p>Filter coloured shapes, yay!</p>
          </div>
        </Link>
        <div className="item">Content</div>
        <div className="item">Content</div>
        <div className="item">Content</div>
      </div>
      <FaChevronRight
        id="slider-btn-r"
        size={"6rem"}
        opacity={rightArrowOpacity}
        color={"whiteSmoke"}
        onClick={scrollRight}
        style={{ transition: "opacity 0.3s ease-in-out" }}
      />
    </Flex>
  );
};

export default CardScrollList;
