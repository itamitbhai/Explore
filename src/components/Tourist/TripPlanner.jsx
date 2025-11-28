import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTrip } from '../../context/TripContext';
import Card from '../UI/Card';
import Button from '../UI/Button';
import Badge from '../UI/Badge';

const TripPlanner = () => {
  const { destinations, budget, setBudget, removeDestination } = useTrip();
  const [tripName, setTripName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const totalCost = destinations.reduce((sum, dest) => sum + dest.price, 0);
  const remainingBudget = budget - totalCost;

  const handleSaveTrip = () => {
    const tripData = {
      name: tripName,
      destinations,
      budget,
      totalCost,
      startDate,
      endDate,
      createdAt: new Date().toISOString()
    };
    console.log('Saving trip:', tripData);
    alert('Trip saved successfully!');
  };

  return (
    <div className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Plan Your Perfect Trip</h2>
          <p className="text-xl text-gray-600">Organize your destinations, budget, and itinerary</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Trip Details Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-6">Trip Details</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trip Name
                  </label>
                  <input
                    type="text"
                    value={tripName}
                    onChange={(e) => setTripName(e.target.value)}
                    placeholder="My Dream Vacation"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Budget ($)
                  </label>
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    placeholder="5000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Destinations and Summary */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Budget Summary */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Budget Summary</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-primary-600">${budget}</p>
                  <p className="text-sm text-gray-600">Total Budget</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">${totalCost}</p>
                  <p className="text-sm text-gray-600">Total Cost</p>
                </div>
                <div>
                  <p className={`text-2xl font-bold ${
                    remainingBudget >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    ${Math.abs(remainingBudget)}
                  </p>
                  <p className="text-sm text-gray-600">
                    {remainingBudget >= 0 ? 'Remaining' : 'Over Budget'}
                  </p>
                </div>
              </div>
            </Card>

            {/* Selected Destinations */}
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Selected Destinations</h3>
                <span className="text-gray-600">{destinations.length} destinations</span>
              </div>

              {destinations.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No destinations added yet. Start by exploring and adding destinations to your trip!
                </p>
              ) : (
                <div className="space-y-4">
                  {destinations.map((destination) => (
                    <motion.div
                      key={destination.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={destination.image}
                          alt={destination.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <h4 className="font-semibold">{destination.name}</h4>
                          <p className="text-sm text-gray-600">${destination.price}</p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeDestination(destination.id)}
                        className="text-red-600 border-red-600 hover:bg-red-50"
                      >
                        Remove
                      </Button>
                    </motion.div>
                  ))}
                </div>
              )}
            </Card>

            {/* Save Trip Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={handleSaveTrip}
                disabled={destinations.length === 0 || !tripName}
                className="w-full py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save Trip Plan
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TripPlanner;