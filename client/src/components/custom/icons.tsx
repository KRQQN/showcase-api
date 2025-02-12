import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Box } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

import bashSvg from '@/assets/icons/Bash.svg';
import css3Svg from '@/assets/icons/css3.svg';
import gitlabSvg from '@/assets/icons/gitlab.svg';
import gitSvg from '@/assets/icons/Git.svg';
import graphQlSvg from '@/assets/icons/GraphQL.svg';
import html5Svg from '@/assets/icons/html5.svg';
import javaScriptSvg from '@/assets/icons/javascript.svg';
import javaSvg from '@/assets/icons/java.svg';
import nextJsSvg from '@/assets/icons/NextJS.svg';
import nodeJsSvg from '@/assets/icons/nodejs.svg';
import npmSvg from '@/assets/icons/npm.svg';
import oauthSvg from '@/assets/icons/oauth.svg';
import postgreSqlSvg from '@/assets/icons/postgresql.svg';
import pythonSvg from '@/assets/icons/python.svg';
import redisSvg from '@/assets/icons/Redis.svg';
import sequelizeSvg from '@/assets/icons/Sequelize.svg';
import swaggerSvg from '@/assets/icons/Swagger.svg';
import typeScriptSvg from '@/assets/icons/typescript.svg';
import viteJsSvg from '@/assets/icons/ViteJS.svg';
import authO from '@/assets/icons/autO.svg';
import docker from '@/assets/icons/docker.svg'
import figma from '@/assets/icons/Figma.svg'
import firebase from '@/assets/icons/Firebase.svg'
import influxDB from '@/assets/icons/InfluxDB.svg'
import raspberry from '@/assets/icons/Raspberry Pi.svg'
import mongoDB from '@/assets/icons/MongoDB.svg'

const icons = [
  figma,
  firebase,
  influxDB,
  raspberry,
  mongoDB,
  docker,
  authO,
  bashSvg,
  css3Svg,
  gitlabSvg,
  gitSvg,
  graphQlSvg,
  html5Svg,
  javaScriptSvg,
  javaSvg,
  nextJsSvg,
  nodeJsSvg,
  npmSvg,
  oauthSvg,
  postgreSqlSvg,
  pythonSvg,
  redisSvg,
  sequelizeSvg,
  typeScriptSvg,
  viteJsSvg,
  swaggerSvg,
];

const FlyingIcons: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const iconSize = 80;
  const padding = 5;

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current;
        setDimensions({ width: offsetWidth, height: offsetHeight });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const { width, height } = dimensions;

  // Define evenly spaced Y positions
  const calculateYPositions = (count: number) => {
    const yMid = height / 2

    const x = Array.from(
      { length: count },
      (_, i) => i % 2== 0
      ? yMid - padding*i -(i+iconSize ) 
      : yMid + padding*i+ (i-iconSize) ) ;
      

      return x
  };

  const calculateXPositions = (count: number) => {
    const xMid = width / 2 

    const x = Array.from(
      { length: count },
      (_, i) => i % 2 == 0
      ? xMid - (iconSize * i) - (Math.random()* 500)
      : xMid - (iconSize * i) - (Math.random()* 500)) ;
      
      console.log(x)
      return x
  };

  const yPositions = calculateYPositions(icons.length);
  const xPositions = calculateXPositions(icons.length);

  // Define Framer Motion variants
  const iconVariants: Variants = {
    initial: (index: number) => ({
      x: xPositions[index],
      y: yPositions[index],
      rotate: 0,
      opacity: 0,
    }),
    animate: (index: number) => ({
      x: width + iconSize, 
      y: yPositions[index], 
      rotate: 360,
      opacity: 1,
      transition: {
        x: {
          duration: Math.random() * 20 + 12,
          repeat: Infinity,
          ease: 'linear',
        },
        rotate: {
          duration: Math.random() * 10 + 3, 
          repeat: Infinity,
          ease: 'linear',
        },
        opacity: { duration: 1 },
      },
    }),
    exit: {
      opacity: 0,
    },
  };

  return (
    <Box
      ref={containerRef}
      position="relative"
      width="100%"
      height="100%"
      overflow="hidden"
      bg="none"
    >
      <AnimatePresence>
        {icons.map((icon, index) => (
          <motion.img
            key={icon}
            src={icon}
            custom={index} 
            variants={iconVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{
              position: 'absolute',
              height: `${iconSize}px`,
              top: 0,
            }}
          />
        ))}
      </AnimatePresence>
    </Box>
  );
};

export default FlyingIcons;