<template>
  <div v-if="cartItem" class="flex justify-between pb-5">
    <img class="w-[100px]" :src="cartItem.imageURL" />
    <div class="w-[300px]">
      <div class="py-3 px-5 flex justify-between">
        <p class="font-bold">{{ cartItem.name }}</p>
        <p class="text-gray-900">{{ cartItem.price }}</p>
      </div>
      <div class="py-3 px-5 flex justify-between items-end">
        <div class="flex justify-start">
          <button
            :class="loading || cartItem.qty <= 1 ? 'disabled' : ''"
            class="bg-gray-200 hover:bg-gray-300 text-white font-bold px-2"
            @click="($event) => updateCartItem(-1)"
          >
            -
          </button>
          <p class="text-gray-900 text-center bg-gray-100 w-[50px]">
            {{ cartItem.qty }}
          </p>
          <button
            :class="loading ? 'disabled' : ''"
            class="bg-gray-200 hover:bg-gray-300 text-white font-bold px-2"
            @click="($event) => updateCartItem(1)"
          >
            +
          </button>
        </div>
        <button
          class="pl-3 inline-block no-underline hover:text-black"
          @click="($event) => removeCartItem()"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#5f6368"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path
              d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartItem",
  props: ["cartItem"],
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    async removeCartItem() {
      this.loading = true;
      await this.$store.commit("removeFromCart", {
        product: { ...this.cartItem, qty: 1 },
      });
      this.loading = false;
    },
    async updateCartItem(increment) {
      this.loading = true;
      await this.$store.commit("updateCartItemQty", {
        cartItemId: this.cartItem.id,
        cartItemQty: this.cartItem.qty + increment,
      });
      this.loading = false;
    },
  },
};
</script>
