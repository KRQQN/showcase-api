import React from "react";
import { motion } from "framer-motion";
import FlyingIcons from "./icons";

const ScrollAnimations: React.FC = () => {
  return (
    
      <motion.div
        initial={{ opacity: 0, y: 150 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1 }}
        style={{
          height: "10rem",
          background: "none",
          overflow: "hidden",
        }}
      >
      <FlyingIcons/>
      </motion.div>
    
  );
};

export default ScrollAnimations;
