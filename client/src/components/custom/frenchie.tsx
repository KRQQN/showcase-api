import { useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { Container, ISourceOptions } from '@tsparticles/engine';
import { loadFull } from 'tsparticles';
import { loadPolygonMaskPlugin } from '@tsparticles/plugin-polygon-mask';
import '@/App.css';

const FrenchBulldog = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
      await loadPolygonMaskPlugin(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    if (container) {
      await container.refresh();
    }
  };
  const options: ISourceOptions = {
    fps_limit: 30,
    fullScreen: {
      enable: false
    },
    particles: {
      collisions: {
        enable: false
      },
      number: {
        value: 70,
        density: {
          enable: false
        }
      },
      links: {
        enable: true,
        distance: 100,
        opacity: 0.17,
        color: '#FFD700',
        width: 1.2
      },
      move: {
        enable: true,
        speed: 0.25,
        direction: 'none',
        random: false,
        straight: false,
        outModes: 'bounce'
      },
      opacity: {
        value: 0.2,
        animation: {
          enable: true,
          speed: 1,
          sync: true
        }
      },
      size: {
        value: 3
      }
    },

    polygon: {
      enable: true,
      scale: 0.7,
      type: 'inline',
      move: {
        radius: 6
      },
      url: '/french.svg',
      inline: {
        arrangement: 'equidistant'
      },
      draw: {
        enable: true,
        stroke: {
          color: '#f0f0f0',
          width: 3,
          opacity: 0.25
        }
      }
    },
    retina_detect: true,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: 'grab'
        }
      },
      modes: {
        bubble: {
          size: 6,
          distance: 40
        }
      }
    }
  };

  if (init) {
    return (
      <Particles
        id="tsparticles"
        options={options}
        particlesLoaded={particlesLoaded}
      />
    );
  }

  return null;
};

export default FrenchBulldog;
