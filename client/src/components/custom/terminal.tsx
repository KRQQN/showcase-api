import { useEffect, useRef, useState } from 'react';
import './terminal.scss';
import { Flex } from '@chakra-ui/react';

const Terminal = ({showTerminal}: {showTerminal: () => void}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState<string>('');
  const [history, setHistory] = useState<string[]>([]);
  const [showMenu, setShowMenu] = useState<boolean>(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value.toLowerCase());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (input.trim() === 'clear') {
        setHistory([]);
        setInput('');
        return;
      }

      if (input.trim() === 'menu') {
        setShowMenu(!showMenu);
        setInput('');
        return;
      }

      if (input.trim() === '1') {
        window.open('http://localhost:3001/wordle');
        setInput('');
      }
      if (input.trim() === '4') {
        showTerminal();
        setInput('');
      }



      setHistory([...history, input]);
      setInput('');
    }
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="terminal" onClick={handleClick}>
      <div className="terminal_toolbar">
        <p className="user">user@bash: ~</p>
        <button className="add_tab">+</button>
      </div>

      <div className="terminal_body">
      {showMenu && <Menu/>}
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
    '        :::   :::   :::::::::: ::::    ::: :::    :::',
    '      :+:+: :+:+:  :+:        :+:+:   :+: :+:    :+: ',
    '    +:+ +:+:+ +:+ +:+        :+:+:+  +:+ +:+    +:+  ',
    '   +#+  +:+  +#+ +#++:++#   +#+ +:+ +#+ +#+    +:+   ',
    '  +#+       +#+ +#+        +#+  +#+#+# +#+    +#+    ',
    ' #+#       #+# #+#        #+#   #+#+# #+#    #+#     ',
    '###       ### ########## ###    ####  ########       '
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
      <Flex justifyContent={'space-evenly'} mb={5}>
        <p>[1] wordle</p>
        <p>[2] other </p>
        <p>[3] other</p>
        <p>[4] Mommy i want GUI</p>
      </Flex>
      <div className='separator'></div>
    </>
  );
};

export default Terminal;
