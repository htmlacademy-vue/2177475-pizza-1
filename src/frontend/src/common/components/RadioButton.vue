<template>
  <input
    type="radio"
    name="dought"
    :value="radioValue"
    class="visually-hidden"
    checked
  />
</template>

<script>
export default {
  name: "RadioButton",
  props: {
    radioValue: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped></style>
