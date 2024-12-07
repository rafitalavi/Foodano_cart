import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ setSearchQuery, setGenreFilter }) => {
  return (
    <nav className="navbar">
      <h1>Book Finder</h1>
      <input
        type="text"
        placeholder="Search by title..."
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <select onChange={(e) => setGenreFilter(e.target.value)}>
        <option value="">All Genres</option>
        <option value="fiction">Fiction</option>
        <option value="non-fiction">Non-Fiction</option>
        {/* Add more genres as needed */}
      </select>
      <Link to="/wishlist">Wishlist</Link>
    </nav>
  );
};

export default Navbar;
