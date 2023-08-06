import { createStore } from "vuex";
import { auth } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

const store = createStore({
  // state of the app
  state: {
    user: null,
    authIsReady: false,
  },
  // changes for state
  mutations: {
    setUser(state, payload) {
      state.user = payload;
      console.log(`user state changed: ${state.user}`);
    },
    setAuthIsReady(state, payload) {
      state.authIsReady = payload
    }
  },
  // business logic and async func fetch data...
  actions: {
    async signup(context, { email, password }) {
      console.log(`signup action`);
      const res = await createUserWithEmailAndPassword(auth, email, password);
      if (res) {
        context.commit("setUser", res.user);
      } else {
        throw new Error("could not complete signup");
      }
    },

    async login(context, { email, password }) {
      console.log(`login action`);
      const res = await signInWithEmailAndPassword(auth, email, password);
      if (res) {
        context.commit("setUser", res.user);
      } else {
        throw new Error("could not complete login");
      }
    },

    async logout(context) {
      console.log('logout action');
      await signOut(auth)
      context.commit('setUser', null)
    }
  },
});

const unsub = onAuthStateChanged( auth, (user) => {
  store.commit('setAuthIsReady', true)
  store.commit('setUser', user)
  unsub()
})

export default store;

/*
  state: {
    points: 0
  },
  mutations: {
    updatePoints(state, payload) {
      state.points = state.points + payload
    }
  }
*/
