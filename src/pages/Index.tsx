
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Presentation from '@/components/Presentation';

const Index = () => {
  // Add view transitions API support
  useEffect(() => {
    document.documentElement.classList.add('js-focus-visible');

    // Add smooth scrolling effect
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.hash && link.hash.startsWith('#') && link.origin === window.location.origin) {
        e.preventDefault();
        const targetElement = document.querySelector(link.hash);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleLinkClick);
    
    return () => {
      document.removeEventListener('click', handleLinkClick);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="min-h-screen bg-white"
    >
      <Presentation />
    </motion.div>
  );
};

export default Index;
