<template>
  <div class="drag-n-drop" @mousedown.prevent="dragStart" @mouseup="dragEnd">
    <div
      class="drag__item"
      :style="ingredientPosition"
      v-show="positionX !== 0 || positionY !== 0"
    >
      <img
        :src="require('../../../assets/img/filling/' + ingredientName + '.svg')"
        alt=""
      />
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "DragNDrop",
  props: {
    ingredientName: {
      type: String,
      required: true,
    },
    ingredientCount: {
      type: Number,
      default: 0,
    },
    pizzaArea: {
      required: true,
    },
  },
  data() {
    return {
      positionX: 0,
      positionY: 0,
      ingredientReady: false,
    };
  },
  methods: {
    dragStart() {
      if (this.$props.ingredientCount < 3) {
        document.documentElement.addEventListener("mousemove", this.dragMove);
        document.documentElement.addEventListener("mouseup", this.dragEnd);
      }
    },
    dragMove() {
      this.positionX = event.clientX - 16;
      this.positionY = event.clientY - 16;
      this.ingredientReady =
        this.positionX >= this.pizzaArea.x &&
        this.positionX <= this.pizzaArea.x + this.pizzaArea.width &&
        this.positionY >= this.pizzaArea.y &&
        this.positionY <= this.pizzaArea.y + this.pizzaArea.height;
    },
    dragEnd() {
      this.positionX = 0;
      this.positionY = 0;
      document.documentElement.removeEventListener("mousemove", this.dragMove);
      document.documentElement.removeEventListener("mouseup", this.dragEnd);
      if (this.ingredientReady) {
        this.$emit("addIngredient");
      }
    },
  },
  computed: {
    ingredientPosition() {
      return "top: " + this.positionY + "px; left: " + this.positionX + "px;";
    },
  },
};
</script>

<style scoped>
.drag__item {
  position: absolute;
  z-index: 5;
  width: 32px;
  height: 32px;
}

.drag__item img {
  width: 32px;
  height: 32px;
}
</style>
