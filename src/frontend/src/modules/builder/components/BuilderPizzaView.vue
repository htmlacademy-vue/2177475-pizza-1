<template>
  <div
    class="content__constructor"
    @drop="onDragDrop($event)"
    @dragenter.prevent
    @dragover.prevent
  >
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
    onDragDrop(e) {
      const draggableItem = JSON.parse(e.dataTransfer.getData("item"));
      this.$emit("addIngredient", { count: 1, id: draggableItem });
    },
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
};
</script>

<style scoped></style>
