import axios from 'axios';

const API_KEY = 'a7722589dc29fac056c18bf39b029797';
const BASE_URL = 'https://api.themoviedb.org/3/';

axios.defaults.baseURL = BASE_URL;
axios.defaults.params = {
  api_key: API_KEY,
  language: 'en-US',
};

async function getPopularMovies() {
  try {
    const config = {
      url: `trending/movie/day`,
    };
    const { data } = await axios(config);

    return data.results;
  } catch (error) {
    console.log('error', { error });
    return null;
  }
}

async function getMoviesByKeyWord(query) {
  try {
    const config = {
      url: `search/movie`,
      params: {
        query,
      },
    };
    const { data } = await axios(config, query);

    return data.results;
  } catch (error) {
    console.log('error', { error });
    return null;
  }
}

async function getMovieById(id) {
  try {
    const config = {
      url: `movie/${id}`,
    };
    const { data } = await axios(config, id);

    return data;
  } catch (error) {
    console.log('error', { error });
    return null;
  }
}

async function getCastInfo(id) {
  try {
    const config = {
      url: `movie/${id}/credits`,
    };
    const { data } = await axios(config, id);

    return data.cast;
  } catch (error) {
    console.log('error', { error });
    return null;
  }
}

async function getMovieReviews(id) {
  try {
    const config = {
      url: `movie/${id}/reviews`,
    };
    const { data } = await axios(config, id);

    return data.results;
  } catch (error) {
    console.log('error', { error });
    return null;
  }
}

const api = {
  getPopularMovies,
  getMoviesByKeyWord,
  getMovieById,
  getCastInfo,
  getMovieReviews,
};

export default api;

// async function fetchByURL(url) {
//   const response = await fetch(url);
//   const data = await response.json();
//   return data;
// }

// function getPopularMovies() {
//   const url = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&language=en-US`;
//   return fetchByURL(url);
// }

// function getMoviesByKeyWord(query) {
//   const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}`;
//   return fetchByURL(url);
// }

// function getMovieById(id) {
//   const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`;
//   return fetchByURL(url);
// }

// function getCastInfo(id) {
//   const url = `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`;
//   return fetchByURL(url);
// }

// function getMovieReviews(id) {
//   const url = `${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}&language=en-US`;
//   return fetchByURL(url);
// }
