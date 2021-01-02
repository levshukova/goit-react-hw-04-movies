import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Loader from '../../components/Loader';
import Status from '../../services/status';
import apiservice from '../../services/apiservice';
import ErrorView from '../NotFoundView';
import s from './HomePage.module.css';
import noImageFound from '../../images/not_found.gif';

function HomePage() {
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    setStatus(Status.PENDING);
    apiservice
      .getPopularMovies()
      .then(results => {
        setMovies(results);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        console.log(error);
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [error]);

  return (
    <main className={s.container}>
      <h1 className={s.mainTitle}>Trending today</h1>

      {status === Status.PENDING && <Loader />}

      {status === Status.REJECTED && <ErrorView />}

      {status === Status.RESOLVED && (
        <>
          <ul className={s.moviesList}>
            {movies.map(({ id, poster_path, title }) => (
              <li key={id} className={s.moviesItem}>
                <Link
                  to={{
                    pathname: `movies/${id}`,
                  }}
                >
                  <img
                    src={
                      poster_path
                        ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                        : noImageFound
                    }
                    alt={title}
                    className={s.poster}
                  />
                </Link>
                <div className={s.titleBox}>
                  <p className={s.title}>{title}</p>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}

export default HomePage;
