import { useState, useEffect, Suspense, lazy } from 'react';
import {
  NavLink,
  useParams,
  useRouteMatch,
  Route,
  useHistory,
  useLocation,
} from 'react-router-dom';

import apiservice from '../../services/apiservice';
import Status from '../../services/status';
import baseImageURL from '../../services/baseImageURL';
import ErrorView from '../NotFoundView';
import Loader from '../../components/Loader';
import noImageFound from '../../images/not_found.gif';
import s from './MovieDetailsPage.module.css';

const Cast = lazy(() => import('../Cast' /* webpackChunkName: "cast"*/));
const Reviews = lazy(() =>
  import('../Reviews' /* webpackChunkName: "reviews"*/),
);

export default function MovieDetailsPage() {
  const history = useHistory();
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();
  const { url, path } = useRouteMatch();
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    setStatus(Status.PENDING);
    apiservice
      .getMovieById(movieId)
      .then(({ poster_path, original_title, popularity, overview, genres }) => {
        setMovie({
          src: poster_path
            ? `${baseImageURL}${poster_path}`
            : `${noImageFound}`,
          title: original_title,
          score: popularity.toFixed(1),
          overview,
          genres,
        });
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        console.log(error);
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [movieId, error]);

  const goBack = () => {
    history.push(location?.state?.from ?? '/');
  };

  return (
    <main className={s.container}>
      <button onClick={goBack} type="button" className={s.btn}>
        &#171;
      </button>

      {status === Status.PENDING && <Loader />}

      {status === Status.REJECTED && <ErrorView />}

      {status === Status.RESOLVED && (
        <>
          <div className={s.wrapper}>
            <img className={s.image} src={movie.src} alt={movie.title} />
            <div className={s.description}>
              <h2 className={s.movieTitle}>{movie.title}</h2>
              <h3 className={s.title}>Score</h3>
              <p className={s.info}>{movie.score}</p>
              <h3 className={s.title}>About</h3>
              <p className={s.info}>{movie.overview}</p>
              <h3 className={s.title}>Genres</h3>
              <ul className={s.genre}>
                {movie.genres.map(genre => (
                  <li key={genre.id}>{genre.name}</li>
                ))}
              </ul>
            </div>
          </div>
          <ul className={s.submenu}>
            <li>
              <NavLink
                to={{
                  pathname: `${url}/cast`,
                  state: {
                    from: location.state ? location.state.from : '/',
                  },
                }}
                className={s.submenuItem}
                activeClassName={s.activeSubmenuItem}
              >
                Cast
              </NavLink>
            </li>
            <li>
              <NavLink
                to={{
                  pathname: `${url}/reviews`,
                  state: {
                    from: location.state ? location.state.from : '/',
                  },
                }}
                className={s.submenuItem}
                activeClassName={s.activeSubmenuItem}
              >
                Reviews
              </NavLink>
            </li>
          </ul>

          {
            <Suspense fallback={<Loader />}>
              <Route path={`${path}/cast`}>
                {status === Status.RESOLVED && <Cast />}
              </Route>

              <Route path={`${path}/reviews`}>
                {status === Status.RESOLVED && <Reviews />}
              </Route>
            </Suspense>
          }
        </>
      )}
    </main>
  );
}
