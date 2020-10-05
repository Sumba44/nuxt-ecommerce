<template>
  <div class="container">
    <!-- <nuxt-link
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
    </nuxt-link> -->
  </div>
</template>

<script>
// import axios from "axios";

export default {


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