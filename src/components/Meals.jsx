import { useState, useEffect } from "react";
import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const useConfig = {}; // Configuration for the HTTP request

export default function Meals() {
  // Using custom hook to fetch meals
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", useConfig, []);

  // Show a loading message while fetching data
  if (isLoading) {
    return <p className="center">Fetching meals...</p>;
  }

  // Show an error message if there is an error
  if (error) {
    return <Error title="Failed to fetch meals" message={error} />;
    console.log("ERROR HIT")
  }

  // Show a message if no meals are found
  if (!loadedMeals || loadedMeals.length === 0) {
    return <p className="center">No meals found</p>;
  }

  // Render the list of meals
  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
