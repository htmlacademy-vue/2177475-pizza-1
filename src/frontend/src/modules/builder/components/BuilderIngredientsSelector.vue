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
            <div>
              <radio-button
                name="sauce"
                :value="radioValue(sauce)"
                :radioState="sauce.id === selectedSauce.id"
                @justToggle="selectSauce(sauce)"
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
              <app-drag
                :ingredient="item"
                :isDraggable="countItemNumber(item) < 3"
              >
                <span :class="['filling', 'filling--' + item.imgName]">
                  {{ item.name }}
                </span>
              </app-drag>
              <item-counter
                :itemCount="countItemNumber(item)"
                @toggleCounter="
                  $emit('countIngredient', { count: $event, item: item })
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
    ingredients: {
      type: Array,
      required: true,
    },
    selectedIngredients: {
      type: Array,
      required: true,
    },
    sauces: {
      type: Array,
      required: true,
    },
    selectedSauce: {
      type: Object,
      required: true,
    },
  },
  methods: {
    countItemNumber(ingredient) {
      const currentIngredient = this.selectedIngredients.find((item) => {
        return ingredient.id === item.id;
      });
      if (!currentIngredient) {
        return 0;
      }
      return currentIngredient.count;
    },
    selectSauce(sauce) {
      this.$emit("selectSauce", sauce);
    },
    radioValue(sauce) {
      return sauce.name === "Томатный" ? "tomato" : "creamy";
    },
  },
};
</script>

<style scoped></style>
