<template>
  <div id="star-rating-vue">
    <ul class="star-rating__white">
      <li v-for="index in 5" :key="index">
        <font-awesome-icon
          @click.stop="drawer = !drawer"
          :icon="['far', 'star']"
          class="star-rating__star white"
          :style="{ fontSize: size + 'px' }"
        />
      </li>
    </ul>
    <ul class="star-rating__wrap">
      <li v-for="index in rating" :key="index">
        <font-awesome-icon
          @click.stop="drawer = !drawer"
          :icon="['fas', 'star']"
          class="star-rating__star"
          :style="{ fontSize: size + 'px' }"
        />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    rating: "",
    size: "",
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
#star-rating-vue {
  position: relative;
}

.star-rating__white {
  list-style: none;
  display: flex;
  padding-left: 0 !important;
}

.star-rating__wrap {
  position: absolute;
  top: 0;
  list-style: none;
  display: flex;
  padding-left: 0 !important;
}

.star-rating__star {
  color: #ffbf09;

  &.white {
    color: #ffbf09;
  }
}
</style>