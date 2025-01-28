import React from "react";
import { motion } from "framer-motion";
import FlyingIcons from "./icons";

const ScrollAnimations: React.FC = () => {
  return (
    <div style={{ height: "300px", padding: "50px" }}>
      <motion.div
        initial={{ opacity: 0, y: 150 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-150px" }}
        transition={{ duration: 1 }}
        style={{
          height: "200px",
          background: "lightblue",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "50px",
          overflow: "hidden",
        }}
      >
      <FlyingIcons/>
      </motion.div>
    </div>
  );
};

export default ScrollAnimations;
