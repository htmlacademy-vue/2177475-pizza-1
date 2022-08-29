<template>
  <div class="counter counter--orange ingredients__counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      :disabled="itemCount === 0"
      @click="toggleCounter(-1)"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      type="text"
      name="counter"
      class="counter__input"
      :value="itemCount"
    />
    <button
      type="button"
      class="counter__button counter__button--plus"
      :disabled="itemCount === 3"
      @click="toggleCounter(1)"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "ItemCounter",
  props: {
    itemCount: {
      type: Number,
      required: true,
    },
  },
  methods: {
    toggleCounter(value) {
      this.$emit("toggleCounter", value);
    },
  },
};
</script>

<style scoped></style>
