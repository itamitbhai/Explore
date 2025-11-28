import { motion } from 'framer-motion';

const About = () => {
  const features = [
    {
      icon: '🌍',
      title: 'Global Destinations',
      description: 'Access thousands of destinations worldwide with detailed information and reviews.'
    },
    {
      icon: '🎯',
      title: 'Smart Planning',
      description: 'AI-powered trip planning that suggests optimal itineraries based on your preferences.'
    },
    {
      icon: '🔄',
      title: 'AR/VR Previews',
      description: 'Experience destinations through immersive augmented and virtual reality before you visit.'
    },
    {
      icon: '💰',
      title: 'Budget Management',
      description: 'Track your expenses and stay within budget with our comprehensive financial tools.'
    }
  ];

  const team = [
    {
      name: 'John Doe',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'Jane Smith',
      role: 'CTO',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'Mike Johnson',
      role: 'Head of Design',
      image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-gray-900 mb-6"
          >
            About TravelEase
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            We're revolutionizing the way people plan and experience travel. Our platform combines 
            cutting-edge technology with deep travel expertise to create unforgettable journeys.
          </motion.p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                To make travel planning effortless and accessible to everyone, while providing 
                immersive experiences that help travelers make informed decisions.
              </p>
              <p className="text-lg text-gray-600">
                We believe that everyone deserves to experience the world, and we're here to 
                remove the barriers that stand between you and your dream destinations.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="bg-primary-500 text-white p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-2">50K+</h3>
                <p className="text-primary-100">Happy Travelers</p>
              </div>
              <div className="bg-primary-600 text-white p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-2">100+</h3>
                <p className="text-primary-100">Countries</p>
              </div>
              <div className="bg-primary-700 text-white p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-2">10K+</h3>
                <p className="text-primary-100">Destinations</p>
              </div>
              <div className="bg-primary-800 text-white p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-2">4.9★</h3>
                <p className="text-primary-100">Average Rating</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose TravelEase?</h2>
            <p className="text-xl text-gray-600">We combine technology and travel expertise for the perfect journey</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">The passionate people behind TravelEase</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-primary-600 mb-4">{member.role}</p>
                <p className="text-gray-600">
                  Passionate about creating amazing travel experiences for our users.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;