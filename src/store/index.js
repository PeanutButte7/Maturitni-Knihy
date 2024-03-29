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
        },
        menuActive: false
    },
    // Interface for outside requests
    getters: {
        // isAdmin(state){
        //     return state.user.data.role === "Admin"
        // },
        user(state){
            return state.user
        },
        menuActive(state) {
            return state.menuActive
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
        },
        SET_DISPLAYNAME(state, value) {
            state.user.data.displayName = value;
        },
        SET_MENUACTIVE(state, value) {
            state.menuActive = value;
        }
    },
    // Commits mutations
    actions: {
        fetchUser({ commit }, user) {
            commit("SET_LOGGED_IN", user !== null);
            if (user) {
                commit("SET_USER", {
                    uid: user.uid,
                    displayName: user.displayName,
                    role: user.role !== null ? user.role : "",
                    contributions: user.contributions,
                    badges: user.badges,
                    verified: user.verified
                });
            } else {
                commit("SET_USER", null);
            }
        },
        changeUserDisplayName({ commit }, displayName) {
            commit("SET_DISPLAYNAME", displayName);
        },
        setMenuActive({ commit }, menuActive) {
            commit("SET_MENUACTIVE", menuActive);
        }
    }
});
