// src/components/GradientText.jsx
import { useEffect } from 'react';

function GradientText({ children }:{children: any}) {
  useEffect(() => {

    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      .gradient-text {
        font-size: 20px;
        margin-bottom: 20px;
        letter-spacing: 10px;
        background: linear-gradient(135deg, rgba(180, 19, 112, 0.5),rgba(207, 6, 214, 0.5));
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        display: inline-block;
        font-weight: bold;
      }
    `;
    document.head.appendChild(styleSheet);

 
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return <span className="gradient-text">{children}</span>;
}

export default GradientText;