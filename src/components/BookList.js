import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import BookCard from './BookCard';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [genreFilter, setGenreFilter] = useState('');
  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem('wishlist')) || []
  );

  useEffect(() => {
    fetch('https://gutendex.com/books')
      .then((res) => res.json())
      .then((data) => setBooks(data.results));
  }, []);

  const addToWishlist = (book) => {
    const updatedWishlist = [...wishlist, book];
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  const removeFromWishlist = (bookId) => {
    const updatedWishlist = wishlist.filter((b) => b.id !== bookId);
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  const filteredBooks = books
    .filter((book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((book) => (genreFilter ? book.genre.includes(genreFilter) : true));

  return (
    <div>
      <Navbar setSearchQuery={setSearchQuery} setGenreFilter={setGenreFilter} />
      <div className="book-list">
        {filteredBooks.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            wishlist={wishlist}
            addToWishlist={addToWishlist}
            removeFromWishlist={removeFromWishlist}
          />
        ))}
      </div>
    </div>
  );
};

export default BookList;
