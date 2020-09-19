<template>
  <div>
    <div v-for="item in cart" :key="item.product.id">
      <p>{{ item.product.title }}</p>
      <p>{{ item.product.quantity }}</p>
    </div>
  </div>
</template>