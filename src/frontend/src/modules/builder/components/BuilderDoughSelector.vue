<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <selector-item
          :class="[
            'dough__input',
            'dough__input--' + doughTranslateName(item).name,
          ]"
          v-for="item in dough"
          :key="item.id"
        >
          <div @click="toggleRadio(item)">
            <radio-button name="dough" :value="doughTranslateName(item).name" />
            <b>{{ item.name }}</b>
            <span>{{ item.description }}</span>
          </div>
        </selector-item>
      </div>
    </div>
  </div>
</template>

<script>
import { dough } from "../../../static/pizza.json";
import { doughTranslateName } from "../../../common/helper";
import RadioButton from "../../../common/components/RadioButton";
import SelectorItem from "../../../common/components/SelectorItem";

export default {
  name: "BuilderDoughSelector",
  components: {
    RadioButton,
    SelectorItem,
  },
  data() {
    return {
      dough,
    };
  },
  methods: {
    doughTranslateName,
    toggleRadio(dough) {
      this.$emit("selectDough", dough);
    },
  },
  mounted() {
    this.toggleRadio(dough[1]);
  },
};
</script>

<style scoped></style>
