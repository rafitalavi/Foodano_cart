import React from 'react';

const Wishlist = () => {
  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

  return (
    <div className="wishlist">
      <h1>Your Wishlist</h1>
      {wishlist.length > 0 ? (
        wishlist.map((book) => (
          <div className="book-card" key={book.id}>
            <img src={book.cover_image} alt={book.title} />
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
          </div>
        ))
      ) : (
        <p>No books in wishlist.</p>
      )}
    </div>
  );
};

export default Wishlist;
