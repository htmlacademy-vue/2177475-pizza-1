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
    ingredient: {
      type: Object,
      required: true,
    },
    isDraggable: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    dragStart(e) {
      e.dataTransfer.setData("item", JSON.stringify(this.ingredient));
    },
  },
};
</script>

<style scoped></style>
