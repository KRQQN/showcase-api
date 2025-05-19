import "./scrollList.scss";
import { Button, Flex, Link } from "@chakra-ui/react";
import { useRef, useEffect } from "react";

const CardScrollList: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

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

    container.addEventListener("mousedown", startDragging);
    container.addEventListener("mousemove", onDrag);
    container.addEventListener("mouseup", stopDragging);
    container.addEventListener("mouseleave", stopDragging);
    container.addEventListener("wheel", handleWheel);

    return () => {
      container.removeEventListener("mousedown", startDragging);
      container.removeEventListener("mousemove", onDrag);
      container.removeEventListener("mouseup", stopDragging);
      container.removeEventListener("mouseleave", stopDragging);
      container.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const scrollLeft = () => {
    const container = containerRef.current;
    container && (container.scrollLeft -= container.offsetWidth * 1);
  };

  const scrollRight = () => {
    const container = containerRef.current;
    container && (container.scrollLeft += container.offsetWidth * 1);
  };

  return (
    <Flex className="container" position={"relative"} alignItems={"center"}>
      <Button className="btn-dir left" onClick={scrollLeft}>
        {"<"}
      </Button>
      <div className="container" ref={containerRef}>
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
        <div className="item">
          <div className="item-image">
            <img src="/path-to-image.jpg" alt="Content" />
          </div>
          <div className="item-title">Content</div>
        </div>
        <div className="item">Content</div>
        <div className="item">Content</div>
        <div className="item">Content</div>
      </div>
      <Button className="btn-dir right" onClick={scrollRight}>
        {">"}
      </Button>
    </Flex>
  );
};

export default CardScrollList;
