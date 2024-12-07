import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Updated for React Router v6
import BookList from './components/BookList';
import Wishlist from './components/Wishlist';
import BookDetails from './components/BookDetails';

/**
 * The App component that sets up routing for different pages.
 * 
 * @returns {JSX.Element} The main application component with routes.
 */
function App() {
  return (
    <Router>
      {/* Routes replaces Switch in React Router v6 */}
      <Routes>
        {/* Route syntax changed, component is replaced with element */}
        <Route path="/" element={<BookList />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/book/:id" element={<BookDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
