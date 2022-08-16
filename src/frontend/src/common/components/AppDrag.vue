<template>
  <div
    class="drag-n-drop"
    :draggable="isDraggable"
    @dragstart="dragStart($event)"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: "AppDrag",
  props: {
    ingredientId: {
      type: Number,
      required: true,
    },
    isDraggable: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    dragStart(e) {
      e.dataTransfer.setData("item", JSON.stringify(this.ingredientId));
    },
  },
};
</script>

<style scoped></style>
