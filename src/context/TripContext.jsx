import React, { createContext, useContext, useReducer } from 'react';

const TripContext = createContext();

const tripReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_DESTINATION':
      return {
        ...state,
        destinations: [...state.destinations, action.payload]
      };
    case 'REMOVE_DESTINATION':
      return {
        ...state,
        destinations: state.destinations.filter(dest => dest.id !== action.payload)
      };
    case 'SET_BUDGET':
      return {
        ...state,
        budget: action.payload
      };
    case 'SET_DATES':
      return {
        ...state,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate
      };
    default:
      return state;
  }
};

const initialState = {
  destinations: [],
  budget: 0,
  startDate: null,
  endDate: null
};

export const TripProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tripReducer, initialState);

  const addDestination = (destination) => {
    dispatch({ type: 'ADD_DESTINATION', payload: destination });
  };

  const removeDestination = (id) => {
    dispatch({ type: 'REMOVE_DESTINATION', payload: id });
  };

  const setBudget = (budget) => {
    dispatch({ type: 'SET_BUDGET', payload: budget });
  };

  const setDates = (startDate, endDate) => {
    dispatch({ type: 'SET_DATES', payload: { startDate, endDate } });
  };

  return (
    <TripContext.Provider value={{
      ...state,
      addDestination,
      removeDestination,
      setBudget,
      setDates
    }}>
      {children}
    </TripContext.Provider>
  );
};

export const useTrip = () => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTrip must be used within a TripProvider');
  }
  return context;
};