<style>
#app {
  font-family: "Work Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.disabled {
  opacity: 0.6;
  pointer-events: none;
}
</style>

<template>
  <div id="app">
    <nav id="header" class="w-full z-30 top-0 py-1">
      <div
        class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-6 py-3"
      >
        <div class="order-1 md:order-2">
          <a
            class="flex items-center tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl"
            href="#"
          >
            VUEJS SHOPIFY API STOREFRONT
          </a>
        </div>

        <MiniCart />
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
import MiniCart from "@/components/MiniCart.vue";
export default {
  name: "App",
  components: {
    MiniCart,
  },
  async mounted() {
    await this.$store.commit("initialiseStore");
  },
};
</script>
