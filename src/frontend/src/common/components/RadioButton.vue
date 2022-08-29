<template>
  <input
    type="radio"
    class="visually-hidden"
    :checked="radioState"
    @input="$emit('justToggle')"
  />
</template>

<script>
export default {
  name: "RadioButton",
  props: {
    radioState: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped></style>
