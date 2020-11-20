
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
    }
}

export const actions = {
    handleFetchMovies({ commit }) {
        commit('GET_ALL_MOVIES');
    },
    handleDeleteMovie({ commit }, id) {
        commit('DELETE_A_MOVIE', id);
    }
}