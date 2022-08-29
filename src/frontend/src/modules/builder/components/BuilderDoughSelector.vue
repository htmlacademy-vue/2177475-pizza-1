<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <selector-item
          :class="['dough__input', 'dough__input--' + doughItem.imgName]"
          v-for="doughItem in dough"
          :key="doughItem.id"
        >
          <div>
            <radio-button
              name="dough"
              :value="doughItem.name"
              :radioState="doughItem.id === selectedDough.id"
              @justToggle="toggleRadio(doughItem)"
            />
            <b>{{ doughItem.name }}</b>
            <span>{{ doughItem.description }}</span>
          </div>
        </selector-item>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "../../../common/components/RadioButton";
import SelectorItem from "../../../common/components/SelectorItem";

export default {
  name: "BuilderDoughSelector",
  props: {
    dough: {
      type: Array,
      required: true,
    },
    selectedDough: {
      type: Object,
      required: true,
    },
  },
  components: {
    RadioButton,
    SelectorItem,
  },
  methods: {
    toggleRadio(doughItem) {
      this.$emit("selectDough", doughItem);
    },
  },
};
</script>

<style scoped></style>
