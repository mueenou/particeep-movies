
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
    SET_LIKE(state, index) {
      if(state.allMovies[index].isLiked === false){
        state.allMovies[index].isLiked = !state.allMovies[index].isLiked;
        state.allMovies[index].likes += 1;
        if(state.allMovies[index].isDisliked) {
          state.allMovies[index].dislikes -= 1;
        }
      }else {
        state.allMovies[index].isLiked = !state.allMovies[index].isLiked;
        state.allMovies[index].likes -= 1;
      }
      state.allMovies[index].isDisliked = false;
    },
    SET_DISLIKE(state, index) {
      if(state.allMovies[index].isDisliked === false){
        state.allMovies[index].isDisliked = !state.allMovies[index].isDisliked;
        state.allMovies[index].dislikes += 1;
        if(state.allMovies[index].isLiked) {
          state.allMovies[index].likes -= 1;
        }

      }else {
        state.allMovies[index].isDisliked = !state.allMovies[index].isDisliked;
        state.allMovies[index].dislikes -= 1;
      }
      state.allMovies[index].isLiked = false;
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
