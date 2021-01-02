import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiservice from '../../services/apiservice';
import s from './Reviews.module.css';
import Status from '../../services/status';

export default function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiservice
      .getMovieReviews(movieId)
      .then(results => {
        if (results.length === 0) {
          throw new Error("Sorry. We don't have any reviews on this movie yet");
        }
        setReviews(results);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [movieId]);

  return (
    <>
      {status === Status.RESOLVED && (
        <ul className={s.review}>
          {reviews.map(review => (
            <li key={review.id} className={s.item}>
              <h2 className={s.name}>{review.author}</h2>
              <p className={s.character}>{review.content}</p>
            </li>
          ))}
        </ul>
      )}

      {status === Status.REJECTED && <p>{error.message}</p>}
    </>
  );
}
