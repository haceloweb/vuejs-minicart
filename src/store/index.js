import { createStore } from "vuex";

export default createStore({
  state: {
    cart: [],
    cartTotal: 0,
  },
  getters: {},
  mutations: {
    async initialiseStore(state) {
      if (localStorage.getItem("cart")) {
        state.cart = JSON.parse(localStorage.getItem("cart"));
      }
      if (localStorage.getItem("cartTotal")) {
        state.cartTotal = parseFloat(localStorage.getItem("cartTotal"));
      }
      return true;
    },
    addToCart(state, payload) {
      if (state.cart.find((product) => product.id === payload.product.id)) {
        state.cart.find((product) => product.id === payload.product.id).qty++;
      } else {
        state.cart.push(payload.product);
      }
      state.cartTotal = state.cart.reduce((accumulator, product) => {
        return (
          parseFloat(accumulator) + parseFloat(product.price * product.qty)
        );
      }, 0);
      localStorage.setItem("cartTotal", JSON.stringify(state.cartTotal));
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    removeFromCart(state, payload) {
      state.cart = state.cart.filter(function (product) {
        return product.id !== payload.product.id;
      });
      state.cartTotal = state.cart.reduce((accumulator, product) => {
        return (
          parseFloat(accumulator) + parseFloat(product.price * product.qty)
        );
      }, 0);
      localStorage.setItem("cartTotal", JSON.stringify(state.cartTotal));
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    updateCartItemQty(state, payload) {
      state.cart.find((product) => product.id === payload.cartItemId).qty =
        payload.cartItemQty;
      state.cartTotal = state.cart.reduce((accumulator, product) => {
        return (
          parseFloat(accumulator) + parseFloat(product.price * product.qty)
        );
      }, 0);
      localStorage.setItem("cartTotal", JSON.stringify(state.cartTotal));
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
  },
  actions: {},
  modules: {},
});
