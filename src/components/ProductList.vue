<template>
  <section class="bg-white py-8">
    <div class="container mx-auto">
      <p v-if="error">Something went wrong...</p>
      <p v-if="loading">Loading...</p>
      <div v-else>
        <div v-if="products" class="flex items-center flex-wrap pt-4 pb-12">
          <div
            v-for="product in products"
            :key="product.id"
            class="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col my-3"
          >
            <img :src="product.imageURL" />
            <div
              class="py-3 px-5 flex items-center justify-between bg-gray-100"
            >
              <p class="font-bold">{{ product.name }}</p>
              <p class="text-gray-900">${{ product.price }}</p>
            </div>
            <AddToCart :product="product" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";
import gql from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";
import AddToCart from "@/components/AddToCart.vue";

const PRODUCTS_QUERY = gql`
  {
    products(first: 20) {
      edges {
        node {
          id
          title
          featuredImage {
            url
          }
          variants(first: 1) {
            edges {
              node {
                priceV2 {
                  amount
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default {
  name: "ProductList",
  components: {
    AddToCart,
  },
  setup() {
    const { loading, error, onResult } = useQuery(PRODUCTS_QUERY);
    const products = ref([]);

    onResult((queryResult) => {
      if (queryResult.data) {
        queryResult.data.products.edges.forEach((product) => {
          products.value.push({
            id: product.node.id,
            name: product.node.title,
            imageURL: product.node.featuredImage.url,
            price: parseFloat(
              product.node.variants.edges[0].node.priceV2.amount
            ).toFixed(2),
          });
        });
      }
    });

    return {
      products,
      loading,
      error,
    };
  },
};
</script>
