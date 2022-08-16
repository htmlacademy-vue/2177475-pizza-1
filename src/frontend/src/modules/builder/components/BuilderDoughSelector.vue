<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <selector-item
          :class="['dough__input', 'dough__input--' + item.imgName]"
          v-for="item in dough"
          :key="item.id"
        >
          <div @click="toggleRadio(item)">
            <radio-button
              name="dough"
              :value="item.name"
              :radioState="item.state"
              @justToggle="togglePizzaState(dough, item)"
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
import { togglePizzaState } from "@/common/helper";
import RadioButton from "../../../common/components/RadioButton";
import SelectorItem from "../../../common/components/SelectorItem";

export default {
  name: "BuilderDoughSelector",
  props: {
    dough: {
      type: Array,
      required: false,
    },
  },
  components: {
    RadioButton,
    SelectorItem,
  },
  methods: {
    togglePizzaState,
    toggleRadio(dough) {
      this.$emit("selectDough", dough);
    },
  },
};
</script>

<style scoped></style>
