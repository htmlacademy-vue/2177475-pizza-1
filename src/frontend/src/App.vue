<template>
  <div id="app">
    <app-layout :cartSum="cartSum">
      <router-view />
    </app-layout>
  </div>
</template>

<script>
import AppLayout from "./layouts/AppLayout";

export default {
  name: "App",
  components: {
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
