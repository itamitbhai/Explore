import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TripProvider } from './context/TripContext';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Explore from './pages/Explore';
import TripPlan from './pages/TripPlan';
import About from './pages/About';

function App() {
  return (
    <TripProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/explore" element={<Explore />} />
            <Route path="/trip-plan" element={<TripPlan />} /> 
             <Route path="/about" element={<About />}/>
          </Routes>
        </Layout>
      </Router>
    </TripProvider>
  );
}

export default App;