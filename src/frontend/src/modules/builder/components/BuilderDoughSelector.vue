<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <selector-item
          :class="[
            'dough__input',
            item.name === 'Тонкое'
              ? 'dough__input--light'
              : 'dough__input--large',
          ]"
          v-for="item in dough"
          :key="item.id"
        >
          <div @click="toggleRadio(item)">
            <radio-button
              :radioValue="item.name === 'Тонкое' ? 'light' : 'large'"
            />
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
    toggleRadio(dough) {
      this.$emit("selectDough", dough);
    },
  },
  mounted() {
    this.toggleRadio(dough[0]);
  },
};
</script>

<style scoped></style>
