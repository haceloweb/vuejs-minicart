<template>
  <button
    v-if="product"
    :class="loading ? 'disabled' : ''"
    @click="($event) => addToCart()"
    class="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4"
  >
    Add To Cart
  </button>
</template>

<script>
export default {
  name: "AddToCart",
  props: ["product"],
  data() {
    return {
      qty: 1,
      loading: false,
    };
  },
  methods: {
    async addToCart() {
      this.loading = true;
      await this.$store.commit("addToCart", {
        product: { ...this.product, qty: 1 },
      });
      this.loading = false;
    },
  },
};
</script>
