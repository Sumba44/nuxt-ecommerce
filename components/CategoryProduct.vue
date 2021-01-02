<template>
  <div class="category__product">
    <div
      class="product__miniature"
      :style="{ backgroundImage: `url(${product.product_image})` }"
    ></div>
    <div class="product__miniature-body">
      <client-only>
        <StarRating
          :rating="parseInt(product.rating.toFixed(0))"
          :star-size="14"
          text-class="product__star-rating d-none"
          read-only
        ></StarRating>
      </client-only>
      <h4>{{ product.product_name.substring(0, 40) + ".." }}</h4>

      <div class="category__product__price">{{ product.price }} €</div>

      <div class="d-flex align-center justify-space-between mt-3">
        <span>{{ product.category }}</span>
        <span v-if="product.quantity >= 1" class="product__stock"
          >In stock ({{ product.quantity }} pcs)</span
        >
        <span v-else class="product__stock out-of-stock">Out of stock</span>
      </div>
    </div>
  </div>
</template>

<script>
import StarRating from "vue-star-rating";

export default {
  components: {
    StarRating
  },

  props: {
    product: {},
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
.category__product {
  box-shadow: 0 0 8px rgb(0 0 0 / 6%);

  h4 {
    font-size: 17px;
    font-weight: 500;
    text-shadow: none;
    line-height: 18px;
    display: block;
    margin-top: 7px;
    height: 38px;
    color: #000;
  }

  span {
    color: #000;
    font-weight: 300;
    font-size: 12px;
  }

  span.product__stock {
    color: $success;
    font-weight: 500;
    font-size: 12px;

    &.out-of-stock {
      color: #b64242;
    }
  }
}

.category__product__price {
  font-size: 25px;
  font-weight: 600;
  color: #2d8e40;
  margin-top: 10px;
}

.product__miniature {
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  border: none;
  height: 265px;
}

.product__miniature-body {
  margin: 0;
  padding: 15px;
}

.category__product-wrap {
  text-decoration: none;

  &:hover {
    color: $blue;
    text-shadow: none;
  }
}

.category__filters {
  box-shadow: 5px 5px 7px rgba(0, 0, 0, 0.05882);
  padding: 30px 25px 10px 5px;
  min-height: 540px;

  h5 {
    margin: 30px 0 30px 0;
    border-bottom: 1px solid #e5e5e5;
    padding-bottom: 15px;
  }
}

.price__slider {
  margin-bottom: 60px;
}
</style>