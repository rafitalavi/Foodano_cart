import { useState, useEffect, useCallback } from "react";

// Helper function to send HTTP requests
async function sendHttpRequest(url, config) {
  const response = await fetch(url, config); // Fetch data from the given URL with the provided configuration
  const resData = await response.json(); // Parse the JSON response

  // If the response status is not OK, throw an error
  if (!response.ok) {
    throw new Error(
      resData.message || "Something went wrong, failed to send request."
    );
  }
  return resData; // Return the parsed response data
}

// Custom hook for managing HTTP requests
export default function useHttp(url, config, initialData) {
  // State for managing error messages
  const [error, setError] = useState(null);

  // State for storing the fetched data
  const [data, setData] = useState(initialData);

  // State for tracking the loading status
  const [isLoading, setIsLoading] = useState(false);
  function clearData(){
    setData(initialData);
  }
  // Callback function to send the HTTP request
  const sendRequest = useCallback(async function sendRequest(data) {
    setIsLoading(true); // Set loading state to true
    setError(null); // Reset any previous errors
    try {
      const resData = await sendHttpRequest(url,{...config,body:data}); // Send the HTTP request
      setData(resData); // Update the data state with the response
    } catch (error) {
      setError(error.message || "Something went wrong!"); // Set the error state
    }
    setIsLoading(false); // Set loading state to false
  }, [url, config]);

  // Automatically send the request if the method is GET or not specified
  useEffect(() => {
    if (!config || config.method === "GET" || !config.method) {
      sendRequest();
    }
  }, [sendRequest, config]);

  // Return the current state and the sendRequest function
  return {
    data,
    isLoading,
    error,
    sendRequest,
    clearData,
  };
}
