<template>
  <div class="content__constructor" ref="pizzaArea">
    <div :class="['pizza', pizzaClass]">
      <div class="pizza__wrapper">
        <div
          :class="[
            'pizza__filling',
            compoundClass(compound),
            { 'pizza__filling--second': compound.count === 2 },
            { 'pizza__filling--third': compound.count === 3 },
          ]"
          v-for="compound in pizzaSetup.ingredients"
          :key="compound.id"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BuilderPizzaView",
  props: {
    pizzaSetup: {
      type: Object,
      required: true,
    },
  },
  methods: {
    compoundClass(compound) {
      if (compound.count > 0) {
        const ingredientArr = compound.image.split("/");
        const ingredientName =
          ingredientArr[ingredientArr.length - 1].split(".")[0];
        return "pizza__filling--" + ingredientName;
      }
      return "";
    },
  },
  computed: {
    pizzaClass() {
      let pizzaClass = "pizza--foundation--";
      if (this.pizzaSetup.dough.id === 1) {
        pizzaClass += "small";
      } else if (this.pizzaSetup.dough.id === 2) {
        pizzaClass += "big";
      }
      if (this.pizzaSetup.sauce.id === 1) {
        pizzaClass += "-tomato";
      } else if (this.pizzaSetup.sauce.id === 2) {
        pizzaClass += "-creamy";
      }
      return pizzaClass;
    },
  },
  mounted() {
    this.$emit("setPizzaArea", this.$refs.pizzaArea);
  },
};
</script>

<style scoped></style>
