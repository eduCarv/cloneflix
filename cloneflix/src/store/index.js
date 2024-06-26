import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  movies: [],
  genresLoaded: false,
  genres: [],
};

export const getGenres = createAsyncThunk("netflix/genres", async () => {
  const {
    data: { genres },
  } = await axios.get(
    `${process.env.REACT_APP_TMDB_BASE_URL}/genre/movie/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=pt-BR`
  );
  return genres;
});

/*Cria um array com os filmes requisitados. 
Somente os que tenham imagem (backdrop_path) e remove os demais gêneros secundários
(Pra facilitar a nossa api na hora de filtrar na tela.) 
Essa separação é totalmente opcional.
*/
const createArrayFromRawData = (array, moviesArray, genres) => {
  //console.log(array)
  array.forEach((movie) => {
    const movieGenres = [];
    movie.genre_ids.forEach((genre) => {
      const name = genres.find(({ id }) => id === genre);
      if (name) movieGenres.push(name.name);
    });
    /*
      Aqui vamos usar o title no lugar do name. Quando a query para outros 
      idiomas além do inglês é usado o nome no idioma solicitado vem no title.
    */
    if (movie.backdrop_path) {
      moviesArray.push({
        id: movie.id,
        name: movie?.original_name ? movie.original_name : movie.original_title,
        image: movie.backdrop_path,
        genres: movieGenres.slice(0, 3),
        title: movie.title ? movie.title : movie.original_name,
      });
    }
  });
};

const getRawData = async (api, genres, paging) => {
  const moviesArray = [];
  for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
    const {
      data: { results },
    } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
    createArrayFromRawData(results, moviesArray, genres);
  }
  return moviesArray;
};

/** Faz a requisição de todos os filmes que estão "bombando" que tenham idioma e imagem em PT_BR */
export const fetchMovies = createAsyncThunk(
  "netflix/trending",
  async ({ type }, thunkApi) => {
    const {
      netflix: { genres },
    } = thunkApi.getState();
    return getRawData(
      `${process.env.REACT_APP_TMDB_BASE_URL}/trending/${type}/week?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=pt-BR`,
      genres,
      true
    );
  }
);

export const fetchDataByGenre = createAsyncThunk(
  "netflix/movies-by-genres",
  async ({ genre, type }, thunkApi) => {
    const {
      netflix: { genres },
    } = thunkApi.getState();
    return getRawData(
      `${process.env.REACT_APP_TMDB_BASE_URL}/discover/${type}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&with_genres=${genre}&language=pt-BR`,
      genres
    );
  }
);

export const getUserLikedMovies = createAsyncThunk(
  "cloneflix/getLiked",
  async (email) => {
    const response = await axios.get(
      `http://localhost:5000/api/user/liked/${email}`
    );
    return response.data.movies;
  }
);

export const removeFromLikedMovies = createAsyncThunk(
  "cloneflix/deleteLiked",
  async ({email, movieId}) => {
    const response = await axios.put(
      `http://localhost:5000/api/user/delete`, {
        email, movieId
      }
    );
    return response.data.movies;
  }
);

const NetflixSlice = createSlice({
  name: "Netflix",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
      state.genresLoaded = true;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(fetchDataByGenre.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(getUserLikedMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(removeFromLikedMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
  },
});

export const store = configureStore({
  reducer: {
    netflix: NetflixSlice.reducer,
  },
});
