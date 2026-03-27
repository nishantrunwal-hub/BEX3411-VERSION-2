import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2800); // Fades out before 3s total
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        key="splash"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="flex flex-col items-center"
        >
          {/* Logo icon - a stylized 'A' */}
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            className="text-blue-500 mb-4"
          >
            <path
              d="M12 2L2 22h5l5-10 5 10h5L12 2z"
              fill="currentColor"
            />
          </svg>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl font-bold tracking-widest text-white uppercase"
          >
            Ascend
          </motion.h1>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
