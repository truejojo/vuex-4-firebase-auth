import { onMounted } from "vue";
import { createStore } from "vuex";
import { auth, db } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import router from "../router";

const collectionRef = collection(db, "destinations");

const store = createStore({
  // state of the app
  state: {
    user: null,
    authIsReady: false,
    destinations: [],
  },
  // changes for state
  mutations: {
    SET_USER(state, payload) {
      state.user = payload;
    },
    CLEAR_USER(state) {
      state.user = null;
    },
    SET_AUTH_IS_READY(state, payload) {
      state.authIsReady = payload;
    },
    SET_DESTINATIONS(state, payload) {
      state.destinations = payload;
    },
  },
  // business logic and async func fetch data...
  actions: {
    async signup({ commit }, { email, password }) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        commit("SET_USER", auth.currentUser);
        router.push({ name: "Destinations" });
      } catch (error) {
        switch (error.code) {
          case "auth/email-already-in-use":
            alert("Email already in use");
            break;
          case "auth/invalid-email":
            alert("Invalid email");
            break;
          case "auth/operation-not-allowed":
            alert("Operation not allowed");
            break;
          case "auth/weak-password":
            alert("Weak password");
            break;
          default:
            alert("Something went wrong");
        }
        return;
      }
      // throw new Error("could not complete signup");
    },

    async login({ commit }, { email, password }) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        commit("SET_USER", auth.currentUser);
        router.push({ name: "Destinations" });
      } catch (error) {
        switch (error.code) {
          case "auth/user-not-found":
            alert("User not found");
            break;
          case "auth/wrong-password":
            alert("Wrong password");
            break;
          default:
            alert("Something went wrong");
        }
        return;
      }
      // throw new Error("could not complete login");
    },

    async logout({ commit }) {
      await signOut(auth);
      commit("CLEAR_USER");
      router.push({ name: "Home" });
    },

    // async getDestinations({ commit }) {},
    // onMounted(() => {
    //   onSnapshot(collectionRef, (querySnapshot) => {
    //     const destinations = [];
    //     querySnapshot.forEach((doc) => {
    //       const destination = {
    //         id: doc.id,
    //         ...doc.data(),
    //       };
    //       destinations.push(destination);
    //     });
    //     commit("SET_DESTINATIONS", destinations);
    //   });
    // }),
    fetchAllDestinations({ commit }) {
      onMounted(() => {
        onSnapshot(collectionRef, (querySnapshot) => {
          const destinations = [];
          querySnapshot.forEach((doc) => {
            const destination = {
              id: doc.id,
              ...doc.data(),
            };
            destinations.push(destination);
          });
          commit("SET_DESTINATIONS", destinations);
        });
      });
    },
  },
});

const unsub = onAuthStateChanged(auth, (user) => {
  store.commit("SET_AUTH_IS_READY", true);
  store.commit("SET_USER", user);
  unsub();
});

export default store;
