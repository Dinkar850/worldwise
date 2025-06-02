/* eslint-disable react/prop-types */
import { useEffect, createContext, useState, useContext } from "react";

const CitiesContext = createContext();

const BASE_URL = "http://localhost:8000";

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState();
  const [isCityLoading, setIsCityLoading] = useState(false);

  async function fetchCity(id) {
    try {
      setIsCityLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      if (!res.ok) throw new Error("something went wrong");
      const data = await res.json();
      setCurrentCity(data);
    } catch (err) {
      alert(err.message);
    } finally {
      setIsCityLoading(false);
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        if (!res.ok) throw new Error("Something went wrong");
        const data = await res.json();
        setCities(data);
      } catch (err) {
        alert(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        isCityLoading,
        fetchCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) throw new Error("used at the wrong place");
  return context;
}

export { CitiesProvider, useCities };
