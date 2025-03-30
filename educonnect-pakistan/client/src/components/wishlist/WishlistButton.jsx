// WishlistButton.jsx
import React from 'react';

const WishlistButton = ({ inWishlist, onToggle }) => (
  <button
    className={`px-4 py-2 rounded ${
      inWishlist ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
    } text-white transition`}
    onClick={onToggle}
  >
    {inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
  </button>
);

export default WishlistButton;
