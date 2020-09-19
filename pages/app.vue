<template>
  <div class="container mx-auto py-16">
    <h1 class="font-heading uppercase mb-8">Games</h1>
    <div class="row">
      <nuxt-link :to="'/games/' + doc.id" v-for="doc in games.docs" :key="doc.id" class="col-md-3">
        <img :src="doc.thumbnail" alt="cover">
        <div class="text-black font-semibold text-lg overflow-hidden whitespace-no-wrap overflow-dots">{{ doc.name }}</div>
      </nuxt-link>
    </div>
    <!-- {{ games.docs[0].name }} -->
  </div>
</template>

<script>
import axios from "axios";

export default {

  async asyncData({ params }) {
    let { data } = await axios.get(`https://sandboxapi.g2a.com/v1/products`, {
      headers: {
        authorization:
          "qdaiciDiyMaTjxMt, 74026b3dc2c6db6a30a73e71cdb138b1e1b5eb7a97ced46689e2d28db1050875",
      },
    })

    return { games: data };
  },

  //   async fetch() {
  //     const data = await fetch(`https://sandboxapi.g2a.com/v1/products`, {
  //       headers: {
  //         authorization: "qdaiciDiyMaTjxMt, 74026b3dc2c6db6a30a73e71cdb138b1e1b5eb7a97ced46689e2d28db1050875",
  //       },
  //     })

  //     return {
  //       games: data,
  //     };
  //   },

  //   if (post.id === this.$route.params.id) {
  //       this.post = post
  //     } else {

  //       if (process.server) {
  //         this.$nuxt.context.res.statusCode = 404
  //       }

  //       throw new Error('Post not found')
  //     }
};
</script>