import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Button from '../UI/Button';

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=600&fit=crop",
    title: "Discover Hidden Gems",
    subtitle: "Explore the world's most breathtaking destinations",
    cta: "Start Exploring"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1200&h=600&fit=crop",
    title: "Plan Your Perfect Trip",
    subtitle: "Custom itineraries tailored to your preferences",
    cta: "Plan Now"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1200&h=600&fit=crop",
    title: "Experience AR Previews",
    subtitle: "See your destinations before you visit",
    cta: "Try AR"
  }
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 flex items-center justify-center h-full text-center text-white">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="max-w-4xl px-4"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            {slides[currentSlide].title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            {slides[currentSlide].subtitle}
          </p>
          <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
            {slides[currentSlide].cta}
          </Button>
        </motion.div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;