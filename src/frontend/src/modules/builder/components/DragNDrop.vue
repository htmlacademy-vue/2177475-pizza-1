<template>
  <div class="drag-n-drop" @mousedown.prevent="dragStart" @mouseup="dragEnd">
    <div
      class="drag__item"
      :style="ingredientPosition"
      v-show="positionX !== 0 || positionY !== 0"
    >
      <img
        :src="require('../../../assets/img/filling/' + normalizeImageURL)"
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
    imageURL: {
      type: String,
      required: true,
    },
    pizzaArea: {
      required: true,
    },
  },
  data() {
    return {
      positionX: 0,
      positionY: 0,
      pizzaAreaData: 0,
      ingredientReady: false,
    };
  },
  methods: {
    dragStart() {
      document.documentElement.addEventListener("mousemove", this.dragMove);
      document.documentElement.addEventListener("mouseup", this.dragEnd);
    },
    dragMove() {
      this.positionX = event.clientX - 16;
      this.positionY = event.clientY - 16;
      this.ingredientReady =
        this.positionX >= this.pizzaAreaData.x &&
        this.positionX <= this.pizzaAreaData.x + this.pizzaAreaData.width &&
        this.positionY >= this.pizzaAreaData.y &&
        this.positionY <= this.pizzaAreaData.y + this.pizzaAreaData.height;
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
    normalizeImageURL() {
      const urlArr = this.imageURL.split("/");
      return urlArr[urlArr.length - 1];
    },
  },
  mounted() {
    this.pizzaAreaData = this.pizzaArea.getBoundingClientRect();
    console.log(this.pizzaAreaData);
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
