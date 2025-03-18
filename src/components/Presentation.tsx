
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TypeScriptSlides from './slides/TypeScriptSlides';
import AccessibilitySlides from './slides/AccessibilitySlides';
import RxJSSlides from './slides/RxJSSlides';
import { cn } from '@/lib/utils';

const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } }
};

const slideVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
};

type Topic = 'intro' | 'typescript' | 'accessibility' | 'rxjs';

const Presentation = () => {
  const [currentTopic, setCurrentTopic] = useState<Topic>('intro');
  const [slideIndex, setSlideIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Number of slides for each topic
  const slideCounts = {
    intro: 1,
    typescript: TypeScriptSlides.length,
    accessibility: AccessibilitySlides.length,
    rxjs: RxJSSlides.length
  };

  const totalSlides = Object.values(slideCounts).reduce((a, b) => a + b, 0);
  const topics: Topic[] = ['intro', 'typescript', 'accessibility', 'rxjs'];

  // Get absolute slide index across all topics
  const getAbsoluteSlideIndex = () => {
    let index = 0;
    for (let i = 0; i < topics.indexOf(currentTopic); i++) {
      index += slideCounts[topics[i] as Topic];
    }
    return index + slideIndex;
  };

  const absoluteSlideIndex = getAbsoluteSlideIndex();
  const progressPercentage = (absoluteSlideIndex / (totalSlides - 1)) * 100;

  const nextSlide = () => {
    if (slideIndex < slideCounts[currentTopic] - 1) {
      setSlideIndex(slideIndex + 1);
    } else {
      const currentTopicIndex = topics.indexOf(currentTopic);
      if (currentTopicIndex < topics.length - 1) {
        setCurrentTopic(topics[currentTopicIndex + 1]);
        setSlideIndex(0);
      }
    }
  };

  const prevSlide = () => {
    if (slideIndex > 0) {
      setSlideIndex(slideIndex - 1);
    } else {
      const currentTopicIndex = topics.indexOf(currentTopic);
      if (currentTopicIndex > 0) {
        setCurrentTopic(topics[currentTopicIndex - 1]);
        setSlideIndex(slideCounts[topics[currentTopicIndex - 1] as Topic] - 1);
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
      nextSlide();
    } else if (e.key === 'ArrowLeft') {
      prevSlide();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [slideIndex, currentTopic]);

  // Observer for slide elements to add animations as they enter viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          } else {
            entry.target.classList.remove('active');
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    const elements = document.querySelectorAll('.slide-appear');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [currentTopic, slideIndex]);

  const renderSlide = () => {
    if (currentTopic === 'intro') {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center text-center px-6">
          <motion.div 
            className="slide-appear"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-block px-3 py-1 mb-4 rounded-full bg-black/5 text-xs font-semibold tracking-wide uppercase">
              Technical Presentation
            </div>
          </motion.div>
          <motion.h1 
            className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Modern Web Development
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Best practices for building robust, accessible, and reactive web applications
          </motion.p>
          <motion.div
            className="flex flex-col md:flex-row gap-4 md:gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {[
              { title: 'TypeScript', description: 'Best Practices', topic: 'typescript' },
              { title: 'Web Accessibility', description: 'WCAG Guidelines', topic: 'accessibility' },
              { title: 'RxJS', description: 'Reactive Programming', topic: 'rxjs' }
            ].map((item, i) => (
              <motion.div 
                key={item.title}
                className="p-6 rounded-xl bg-white border border-border shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                whileHover={{ y: -5, transition: { duration: 0.2 }}}
                onClick={() => {
                  setCurrentTopic(item.topic as Topic);
                  setSlideIndex(0);
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 + (i * 0.1) }}
              >
                <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      );
    }

    let slideComponent;
    
    switch (currentTopic) {
      case 'typescript':
        slideComponent = TypeScriptSlides[slideIndex];
        break;
      case 'accessibility':
        slideComponent = AccessibilitySlides[slideIndex];
        break;
      case 'rxjs':
        slideComponent = RxJSSlides[slideIndex];
        break;
      default:
        slideComponent = null;
    }

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentTopic}-${slideIndex}`}
          variants={slideVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="w-full h-full"
        >
          {slideComponent}
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-white flex flex-col"
    >
      {/* Header with topic tabs */}
      <div className="w-full flex justify-between items-center px-6 py-4 border-b border-border">
        <div className="text-sm font-medium">
          <span className="text-muted-foreground">
            Slide {absoluteSlideIndex + 1}/{totalSlides}
          </span>
        </div>
        
        <div className="flex space-x-1">
          {topics.map((topic, index) => (
            <button
              key={topic}
              onClick={() => {
                setCurrentTopic(topic);
                setSlideIndex(0);
              }}
              className={cn(
                "px-4 py-2 text-sm rounded-md transition-colors",
                currentTopic === topic 
                  ? "bg-secondary text-secondary-foreground font-medium" 
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              )}
            >
              {topic === 'intro' 
                ? 'Introduction' 
                : topic.charAt(0).toUpperCase() + topic.slice(1)}
            </button>
          ))}
        </div>
        
        <div className="text-sm font-medium opacity-0">
          Placeholder
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-hidden">
        {renderSlide()}
      </div>
      
      {/* Navigation controls */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-between items-center px-8">
        <button
          onClick={prevSlide}
          disabled={absoluteSlideIndex === 0}
          className={cn(
            "p-3 rounded-full transition-all duration-200",
            absoluteSlideIndex === 0
              ? "opacity-30 cursor-not-allowed"
              : "bg-secondary hover:bg-secondary/80"
          )}
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>
        
        <div className="w-1/2 h-1 bg-muted overflow-hidden rounded-full">
          <div 
            className="h-full bg-primary transition-all duration-300 ease-out" 
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        
        <button
          onClick={nextSlide}
          disabled={absoluteSlideIndex === totalSlides - 1}
          className={cn(
            "p-3 rounded-full transition-all duration-200",
            absoluteSlideIndex === totalSlides - 1
              ? "opacity-30 cursor-not-allowed"
              : "bg-secondary hover:bg-secondary/80"
          )}
          aria-label="Next slide"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default Presentation;
