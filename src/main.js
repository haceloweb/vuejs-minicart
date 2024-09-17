import { createApp, provide, h } from "vue";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  cache,
  uri: "https://mock.shop/api",
});

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },

  render: () => h(App),
})
  .use(store)
  .use(router);
app.mount("#app");
