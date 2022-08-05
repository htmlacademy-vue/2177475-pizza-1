<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <selector-item
          class="diameter__input"
          :class="[
            { 'diameter__input--small': item.multiplier === 1 },
            { 'diameter__input--normal': item.multiplier === 2 },
            { 'diameter__input--big': item.multiplier === 3 },
          ]"
          v-for="item in sizes"
          :key="item.id"
        >
          <div @click="selectSize(item)">
            <radio-button
              class="visually-hidden"
              name="diameter"
              :radioValue="setRadioValue(item.multiplier)"
            />
            <span>{{ item.name }}</span>
          </div>
        </selector-item>
      </div>
    </div>
  </div>
</template>

<script>
import { sizes } from "../../../static/pizza.json";
import SelectorItem from "../../../common/components/SelectorItem";
import RadioButton from "../../../common/components/RadioButton";

export default {
  name: "BuilderSizeSelector",
  components: {
    SelectorItem,
    RadioButton,
  },
  data() {
    return {
      sizes,
    };
  },
  methods: {
    setRadioValue(multiplier) {
      if (multiplier === 1) {
        return "small";
      } else if (multiplier === 2) {
        return "normal";
      }
      return "big";
    },
    selectSize(size) {
      this.$emit("selectSize", size);
    },
  },
  mounted() {
    this.selectSize(sizes[2]);
  },
};
</script>

<style scoped></style>
