<template>
  <div class="container">
    <nuxt-link
      :to="'/category' + '/games/' + doc.id"
      v-for="doc in games.docs"
      :key="doc.id"
      class="col-md-3"
    >
      <div
        class="text-black font-semibold text-lg overflow-hidden whitespace-no-wrap overflow-dots"
      >
        <img :src="doc.smallImage" class="w-100" alt="cover" />
        <h4>{{ doc.name }}</h4>
        <b>{{ doc.platform }}</b>
        <br />
        {{ doc.developer }}
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import axios from "axios";

export default {
  async asyncData({ params, error }) {
    return axios
      .get(
        `https://sandboxapi.g2a.com/v1/products?platform=steam`,
        {
          headers: {
            authorization:
              "qdaiciDiyMaTjxMt, 74026b3dc2c6db6a30a73e71cdb138b1e1b5eb7a97ced46689e2d28db1050875",
          },
        }
      )
      .then((res) => {
        return { games: res.data };
      })
      .catch((err) => {
        error({ statusCode: 404, message: err.message });
      });
  },

  head() {
    return {
      title: "this.games.docs[0].name",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Product page meta description",
        },
        {
          hid: "keywords",
          name: "keywords",
          content: "product, page, meta, keywords",
        },
      ],
    };
  },
};
</script>