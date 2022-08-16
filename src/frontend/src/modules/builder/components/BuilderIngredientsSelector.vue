<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

      <div class="sheet__content ingredients">
        <div class="ingredients__sauce">
          <p>Основной соус:</p>

          <selector-item
            class="radio ingredients__input"
            v-for="sauce in sauces"
            :key="sauce.id"
          >
            <div @click="selectSauce(sauce)">
              <radio-button
                name="sauce"
                :value="radioValue(sauce)"
                :radioState="sauce.state"
                @justToggle="togglePizzaState(sauces, sauce)"
              />
              <span>{{ sauce.name }}</span>
            </div>
          </selector-item>
        </div>

        <div class="ingredients__filling">
          <p>Начинка:</p>

          <ul class="ingredients__list">
            <li
              class="ingredients__item"
              v-for="item in ingredients"
              :key="item.id"
            >
              <app-drag :ingredientId="item.id" :isDraggable="item.count < 3">
                <span :class="['filling', 'filling--' + item.imgName]">
                  {{ item.name }}
                </span>
              </app-drag>
              <item-counter
                :itemCount="item.count"
                @toggleCounter="
                  $emit('addIngredient', { count: $event, id: item.id })
                "
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { updateIngredient, togglePizzaState } from "@/common/helper";
import ItemCounter from "../../../common/components/ItemCounter";
import SelectorItem from "../../../common/components/SelectorItem";
import RadioButton from "../../../common/components/RadioButton";
import AppDrag from "@/common/components/AppDrag";

export default {
  name: "BuilderIngredientsSelector",
  components: {
    ItemCounter,
    SelectorItem,
    RadioButton,
    AppDrag,
  },
  props: {
    submitState: {
      type: Boolean,
      required: true,
    },
    pizzaArea: {
      required: true,
    },
    ingredients: {
      type: Array,
      required: true,
    },
    sauces: {
      type: Array,
      required: true,
    },
  },
  methods: {
    togglePizzaState,
    updateIngredient,
    selectSauce(sauce) {
      this.$emit("selectSauce", sauce);
    },
    radioValue(sauce) {
      return sauce.name === "Томатный" ? "tomato" : "creamy";
    },
  },
  watch: {
    submitState() {
      if (this.submitState) {
        this.updateIngredient();
      }
    },
  },
};
</script>

<style scoped></style>
