<template>
  <div class="order-2 md:order-3 flex items-center relative">
    <button
      class="pl-3 inline-block no-underline hover:text-black"
      @click="($event) => showCart()"
    >
      <svg
        class="fill-current hover:text-black"
        xmlns="http://www.w3.org/2000/svg"
        width="35"
        height="35"
        viewBox="0 0 24 24"
      >
        <path
          d="M21,7H7.462L5.91,3.586C5.748,3.229,5.392,3,5,3H2v2h2.356L9.09,15.414C9.252,15.771,9.608,16,10,16h8 c0.4,0,0.762-0.238,0.919-0.606l3-7c0.133-0.309,0.101-0.663-0.084-0.944C21.649,7.169,21.336,7,21,7z M17.341,14h-6.697L8.371,9 h11.112L17.341,14z"
        />
        <circle cx="10.5" cy="18.5" r="1.5" />
        <circle cx="17.5" cy="18.5" r="1.5" />
      </svg>
    </button>
    <span
      v-if="$store.state.cart.length > 0"
      class="w-[20px] h-[20px] bg-amber-500 font-bold rounded-full absolute top-[-5px] right-[-10px] text-[14px]"
      >{{ $store.state.cart.length }}</span
    >
    <div
      v-if="show && $store.state.cart.length > 0"
      class="absolute top-[40px] right-0 p-5 shadow-lg bg-gray-50"
    >
      <div class="text-right">
        <a
          class="pl-3 inline-block no-underline hover:text-black"
          href="#"
          @click="($event) => hideCart()"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            enable-background="new 0 0 24 24"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#5f6368"
          >
            <rect fill="none" height="24" width="24" />
            <path
              d="M3,3v18h18V3H3z M17,15.59L15.59,17L12,13.41L8.41,17L7,15.59L10.59,12L7,8.41L8.41,7L12,10.59L15.59,7L17,8.41L13.41,12 L17,15.59z"
            />
          </svg>
        </a>
      </div>
      <ul>
        <li
          v-for="cartItem in $store.state.cart"
          :key="cartItem.id"
          class="flex justify-between pb-5"
        >
          <CartItem :cartItem="cartItem" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import CartItem from "@/components/CartItem.vue";
export default {
  name: "MiniCart",
  components: {
    CartItem,
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    showCart() {
      this.show = true;
    },
    hideCart() {
      this.show = false;
    },
  },
};
</script>
