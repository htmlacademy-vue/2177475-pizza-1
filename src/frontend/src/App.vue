<template>
  <div id="app">
    <app-layout :cartSum="cartSum" />
    <index @pizzaSubmit="pizzaSubmit($event)" />
  </div>
</template>

<script>
import Index from "./views/Index";
import AppLayout from "./layouts/AppLayout";

export default {
  name: "App",
  components: {
    Index,
    AppLayout,
  },
  data() {
    return {
      cartSum: 0,
    };
  },
  methods: {
    pizzaSubmit(price) {
      this.cartSum += price;
    },
  },
};
</script>

<style lang="scss">
@import "./assets/scss/app";
</style>
