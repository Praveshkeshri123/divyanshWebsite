// HeartsAnimation.jsx
import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Heart = ({ x, size, onComplete }) => {
  const heartVariants = {
    initial: {
      y: '100vh', // Start at bottom
      opacity: 1,
      x: `${x}vw`,
    },
    animate: {
      y: '-10vh', // Move to just above top
      opacity: 0,
      transition: {
        duration: 3,
        ease: 'easeOut',
        onComplete, // Remove heart when animation completes
      },
    },
  };

  return (
    <motion.div
      className="absolute text-red-500"
      style={{ fontSize: `${size}px` }}
      variants={heartVariants}
      initial="initial"
      animate="animate"
    >
      ♥
    </motion.div>
  );
};

export const HeartsAnimation = () => {
  const [hearts, setHearts] = React.useState([]);

  const generateHeart = useCallback(() => ({
    id: Math.random().toString(36).substr(2, 9),
    x: Math.random() * 100, // 0-100% of viewport width
    size: Math.random() * (50 - 30) + 30,
  }), []);

  const removeHeart = useCallback((id) => {
    setHearts((prev) => prev.filter((heart) => heart.id !== id));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prev) => [...prev, generateHeart()]);
    }, 200);

    return () => clearInterval(interval);
  }, [generateHeart]);

  return (
    <div className="fixed top-0 left-0 w-[100vw] h-[100vh] pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {hearts.map((heart) => (
          <Heart
            key={heart.id}
            x={heart.x}
            size={heart.size}
            onComplete={() => removeHeart(heart.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
