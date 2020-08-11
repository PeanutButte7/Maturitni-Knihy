import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  // Holds data
  state: {
    // Holds information about logged-in user
    user: {
      loggedIn: false, // Was the user authenticated?
      data: null // Information about the logged-in user
    }
  },
  // Interface for outside requests
  getters: {
    // Gets and returns user object
    user(state){
      return state.user
    }
  },
  // Changes state data
  mutations: {
    // Changes if user is logged-in or not
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    // Makes changes to users data
    SET_USER(state, data) {
      state.user.data = data;
    }
  },
  // Commits mutations
  actions: {
    fetchUser({ commit }, user) {
      commit("SET_LOGGED_IN", user !== null);
      if (user) {
        commit("SET_USER", {
          uid: user.uid,
          displayName: user.displayName
        });
      } else {
        commit("SET_USER", null);
      }
    },
  }
});
