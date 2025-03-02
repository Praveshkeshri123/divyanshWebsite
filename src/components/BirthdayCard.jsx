import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Heart = ({ x, size, onComplete }) => {
  const heartVariants = {
    initial: {
      y: "100vh",
      opacity: 1,
      x: `${x}vw`,
    },
    animate: {
      y: "-10vh",
      opacity: 0,
      transition: {
        duration: 3,
        ease: "easeOut",
        onComplete,
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

export const BirthdayCard = () => {
  const [hearts, setHearts] = useState([]);
  const [isAnimationStarted, setIsAnimationStarted] = useState(false);

  const generateHeart = useCallback(() => ({
    id: Math.random().toString(36).substr(2, 9),
    x: Math.random() * 100,
    size: Math.random() * (40 - 20) + 20,
  }), []);

  const removeHeart = useCallback((id) => {
    setHearts((prev) => prev.filter((heart) => heart.id !== id));
  }, []);

  useEffect(() => {
    setIsAnimationStarted(true);

    const interval = setInterval(() => {
      setHearts((prev) => [...prev, generateHeart()]);
    }, 1000); // Increase the interval to reduce the frequency of heart generation

    return () => clearInterval(interval);
  }, [generateHeart]);

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-purple-500 to-pink-500 flex items-center justify-center overflow-hidden p-4">
      {isAnimationStarted && (
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
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
      )}

      <div className="relative z-10 bg-gradient-to-b from-pink-200 to-pink-500 bg-opacity-90 p-6 rounded-xl shadow-lg text-center max-w-sm w-full">
        <div className="flex justify-center mb-2">
          <span className="text-xl">🎉✨</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Happy Birthday Tanisha!
        </h1>
        
        <div className="mb-4 flex justify-center items-center">
          <img src="image.jpeg" className="h-48 rounded-lg shadow-md" alt="Birthday" />
        </div>

        <p className="text-gray-700 mb-4 text-sm">
          Wishing you a day filled with happiness and a year filled with joy. 
          May your birthday be as special as you are!
        </p>

        <div className="flex justify-center space-x-2 mb-4 text-lg">
          <span>🎁</span><span>🎁</span><span>🎁</span>
        </div>

        <button className="bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition duration-300 w-full">
          🎂 Happy Birthday!
        </button>
      </div>
    </div>
  );
};

export default BirthdayCard;