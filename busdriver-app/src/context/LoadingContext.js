import React, { createContext, useState, useContext, useCallback } from 'react';

const LoadingContext = createContext();

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const showLoader = useCallback(() => setLoading(true), []);
  const hideLoader = useCallback(() => setLoading(false), []);

  return (
    <LoadingContext.Provider value={{ loading, showLoader, hideLoader }}>
      {children}
    </LoadingContext.Provider>
  );
};
