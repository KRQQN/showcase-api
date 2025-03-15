import '../../pages/home.scss';

const BackgroundLayout = ({ children }: { children: any }) => {
  return (
    <div className="background-container">
      <div className="background-gradient"></div>

      <div className="glow-container">
        <div className="glow-blob glow-blue"></div>
        <div className="glow-blob glow-purple"></div>
        <div className="glow-blob glow-cyan"></div>
      </div>

      <div className="dot-pattern"></div>

      <div className="content">{children}</div>
    </div>
  );
};

export default BackgroundLayout;
