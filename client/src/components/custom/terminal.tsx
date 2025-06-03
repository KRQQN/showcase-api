import "./terminal.scss";
import { useRef, useState } from "react";
import { Tooltip } from "../ui/tooltip.tsx";
import { HiQuestionMarkCircle } from "react-icons/hi";
import { LuSquareMenu } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { Flex, Icon } from "@chakra-ui/react";

const Terminal = ({ toggleGUI }: { toggleGUI: () => void }) => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState<string>("");
  const [history, setHistory] = useState<string[]>([]);
  const [showMenu, setShowMenu] = useState<boolean>(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value.toLowerCase());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      const _input = input.trim();

      if (_input === "clear") {
        setHistory([]);
        setInput("");
        return;
      }

      if (_input === "1") {
        navigate("/wordle");
        setInput("");
      }

      if (_input === "2") {
        navigate("/filtering");
        setInput("");
      }

      if (_input === "app -t" || _input === "app --toggle-gui") {
        toggleGUI();
        setInput("");
      }

      if (_input === "app -m" || _input === "app --menu") {
        setShowMenu(!showMenu);
        setInput("");
      }

      if (_input === "app -h" || _input === "app --help") {
        setHistory([
          ...history,
          "usage: app [-t | --toggle-gui] [-m | --menu] [-h | --help]",
        ]);
        setInput("");
        return;
      }

      setHistory([...history, input]);
      setInput("");
    }
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="terminal" onClick={handleClick}>
      <div className="terminal_toolbar">
        <Tooltip
          content='Type "app -h" for help'
          openDelay={200}
          contentProps={{
            bg: "white",
            color: "black",
            width: "10rem",
            padding: "0.2rem 0.5rem",
            position: "absolute",
            top: "-2rem",
            left: "1rem",
            borderRadius: "0.5rem",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
            fontSize: "sm",
            fontWeight: "medium",
          }}
        >
          <HiQuestionMarkCircle color={"white"} opacity={0.5} size={"1.5rem"} />
        </Tooltip>
        <p className="user">user@bash: ~</p>
        <Tooltip
          content="Toggle content slider"
          openDelay={200}
          contentProps={{
            bg: "whiteSmoke",
            color: "black",
            width: "10rem",
            padding: "0.2rem 0.5rem",
            position: "absolute",
            top: "-2.5rem",
            left: "1.5rem",
            borderRadius: "0.5rem",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
            fontSize: "sm",
            fontWeight: "medium",
          }}
        >
          <Icon
            as={LuSquareMenu}
            transition="transform 0.2s"
            color={"whiteAlpha.700"}
            onClick={() => toggleGUI()}
            h={"1.7rem"}
            w={"1.7rem"}
            _hover={{
              transform: "scale(1.2)",
              color: "whiteAlpha.900",
              cursor: "pointer",
            }}
          />
        </Tooltip>
      </div>

      <div className="terminal_body">
        {showMenu && <Menu />}
        {history.map((line, index) => (
          <Promt key={index} text={line} />
        ))}

        <Promt text={input} active={true} />

        <input
          ref={inputRef}
          type="text"
          className="terminal_input"
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};

const Promt = ({ text, active }: { text: string; active?: boolean }) => {
  return (
    <div className="terminal_promt">
      <span className="terminal_user">user@bash:</span>
      <span className="terminal_location">~</span>
      <span className="terminal_bling">$</span>
      <div className="input-wrapper">
        {text}
        {active && <span className="terminal_cursor" />}
      </div>
    </div>
  );
};

const Menu = () => {
  const asciiRows = [
    "        :::   :::   :::::::::: ::::    ::: :::    :::",
    "      :+:+: :+:+:  :+:        :+:+:   :+: :+:    :+: ",
    "    +:+ +:+:+ +:+ +:+        :+:+:+  +:+ +:+    +:+  ",
    "   +#+  +:+  +#+ +#++:++#   +#+ +:+ +#+ +#+    +:+   ",
    "  +#+       +#+ +#+        +#+  +#+#+# +#+    +#+    ",
    " #+#       #+# #+#        #+#   #+#+# #+#    #+#     ",
    "###       ### ########## ###    ####  ########       ",
  ];

  return (
    <>
      <div>
        {asciiRows.map((row, index) => (
          <div key={index} className="banner_row">
            {row}
          </div>
        ))}
      </div>
      <Flex justifyContent={"space-evenly"} mb={5}>
        <p>[1] wordle</p>
        <p>[2] filters </p>
        <p>[3] ..coming</p>
        <p>[4] ..coming</p>
      </Flex>
      <div className="separator"></div>
    </>
  );
};

export default Terminal;
