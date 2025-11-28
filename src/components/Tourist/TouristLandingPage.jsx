import HeroSlider from './HeroSlider';
import ARVRPreview from './ARVRPreview';
import TripPlanner from './TripPlanner';
import { dummyDestinations } from "../../data/dummyDestination";

import DestinationCard from './DestinationCard';
import { motion } from 'framer-motion';

const TouristLandingPage = () => {
  const featuredDestinations = dummyDestinations.slice(0, 3);

  return (
    <div>
      <HeroSlider />
      
      {/* Featured Destinations */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Destinations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover handpicked destinations that offer unforgettable experiences and breathtaking scenery
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredDestinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <DestinationCard destination={destination} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ARVRPreview />
      <TripPlanner />
    </div>
  );
};

export default TouristLandingPage;