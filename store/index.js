
export const strict = false;

export const state = () => ({
    allMovies: [],
})


export const mutations = {
    async GET_ALL_MOVIES(state) {
        const response = await import("../data/movies.js");
        const data = await response.movies$;
        console.log(data);
        state.allMovies = data;
    },
    DELETE_A_MOVIE(state, id) {
        state.allMovies = state.allMovies.filter((movie) => movie.id !== id)
    },
    SET_LIKE(state, id) {
      const thisMovie = state.allMovies.find((movie) => id === movie.id);
      console.log(thisMovie);
      if(thisMovie.isLiked === false){
        thisMovie.isLiked = !thisMovie.isLiked;
        thisMovie.likes += 1;
        if(thisMovie.isDisliked) {
          thisMovie.dislikes -= 1;
        }
      }else {
        thisMovie.isLiked = !thisMovie.isLiked;
        thisMovie.likes -= 1;
      }
      thisMovie.isDisliked = false;
    },
    SET_DISLIKE(state, id) {
      const thisMovie = state.allMovies.find((movie) => id === movie.id);
      if(thisMovie.isDisliked === false){
        thisMovie.isDisliked = !thisMovie.isDisliked;
        thisMovie.dislikes += 1;
        if(thisMovie.isLiked) {
          thisMovie.likes -= 1;
        }

      }else {
        thisMovie.isDisliked = !thisMovie.isDisliked;
        thisMovie.dislikes -= 1;
      }
      thisMovie.isLiked = false;
    }
}

export const actions = {
    handleFetchMovies({ commit }) {
        commit('GET_ALL_MOVIES');
    },
    handleDeleteMovie({ commit }, id) {
        commit('DELETE_A_MOVIE', id);
    },
    handleSetLike({ commit }, index) {
        commit('SET_LIKE', index);
    },
    handleSetDislike({ commit }, index) {
      commit('SET_DISLIKE', index);
    },
}
