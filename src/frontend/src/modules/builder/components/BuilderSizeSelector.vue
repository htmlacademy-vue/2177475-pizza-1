<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <selector-item
          class="diameter__input"
          :class="['diameter__input--' + item.imgName]"
          v-for="item in sizes"
          :key="item.id"
        >
          <div>
            <radio-button
              class="visually-hidden"
              name="diameter"
              :value="item.imgName"
              :radioState="item.id === selectedSize.id"
              @justToggle="selectSize(item)"
            />
            <span>{{ item.name }}</span>
          </div>
        </selector-item>
      </div>
    </div>
  </div>
</template>

<script>
import SelectorItem from "../../../common/components/SelectorItem";
import RadioButton from "../../../common/components/RadioButton";

export default {
  name: "BuilderSizeSelector",
  components: {
    SelectorItem,
    RadioButton,
  },
  props: {
    sizes: {
      type: Array,
      required: true,
    },
    selectedSize: {
      type: Object,
      required: true,
    },
  },
  methods: {
    selectSize(size) {
      this.$emit("selectSize", size);
    },
  },
};
</script>

<style scoped></style>
