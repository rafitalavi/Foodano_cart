import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ book, wishlist, addToWishlist, removeFromWishlist }) => {
  const isWishlisted = wishlist.some((b) => b.id === book.id);

  return (
    <div className="book-card">
      <img src={book.cover_image} alt={book.title} />
      <h3>{book.title}</h3>
      <p>Author: {book.author}</p>
      <p>Genre: {book.genre}</p>
      <Link to={`/book/${book.id}`}>View Details</Link>
      {isWishlisted ? (
        <button onClick={() => removeFromWishlist(book.id)}>❤️</button>
      ) : (
        <button onClick={() => addToWishlist(book)}>♡</button>
      )}
    </div>
  );
};

export default BookCard;
