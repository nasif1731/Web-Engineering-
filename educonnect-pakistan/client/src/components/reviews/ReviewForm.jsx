// ReviewForm.jsx
import React, { useState } from 'react';
import { Button, Input, ErrorMessage } from '../common';

const ReviewForm = ({ onSubmit, loading, error }) => {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ rating, comment });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <Input
        label="Rating (1-5)"
        type="number"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        required
      />
      <Input
        label="Comment"
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Share your experience..."
      />

      {error && <ErrorMessage message={error} />}

      <Button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Review'}
      </Button>
    </form>
  );
};

export default ReviewForm;
