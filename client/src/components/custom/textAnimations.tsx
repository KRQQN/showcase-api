import { AnimatePresence, motion, MotionStyle } from "framer-motion";

export const SlidingText = ({
    children,
    text,
    from,
    duration,
    style,
    delay = 0
  }: {
    text?: string;
    from: 'left' | 'right';
    duration: number;
    style: MotionStyle;
    delay?: number;
    typewriter?: boolean;
    children?: React.ReactNode;
  }) => {
    const direction = from === 'left' ? '-100vw' : '100vh';
    return (
      <motion.div
        initial={{ x: direction, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'tween', duration, delay }}
        style={style}
      >
        {children ? children : text}
      </motion.div>
    );
  };
  
  export const SwipeText = ({ word, duration = 2 }: { word: string; duration: number }) => {
    return (
      <div style={{ height: '50px', overflow: 'hidden' }}>
        <AnimatePresence>
          <motion.div
            key={word}
            initial={{ y: '-80%', opacity: 0 }}
            animate={{ y: '0%', opacity: 0.8 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ duration: duration, type: 'tween' }}
            style={{
              translateY: '-5px',
              position: 'absolute',
              width: '100%',
              textAlign: 'left',
              fontSize: '3rem',
              fontWeight: 'bold'
            }}
          >
            {word}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  };