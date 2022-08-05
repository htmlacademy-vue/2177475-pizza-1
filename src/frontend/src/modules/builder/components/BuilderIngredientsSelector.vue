<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

      <div class="sheet__content ingredients">
        <div class="ingredients__sauce">
          <p>Основной соус:</p>

          <selector-item
            class="radio ingredients__input"
            v-for="item in sauces"
            :key="item.id"
          >
            <div @click="selectSauce(item)">
              <radio-button
                type="radio"
                name="sauce"
                :radioValue="item.name === 'Томатный' ? 'tomato' : 'creamy'"
                :value="item.name === 'Томатный' ? 'tomato' : 'creamy'"
                checked
              />
              <span>{{ item.name }}</span>
            </div>
          </selector-item>
        </div>

        <div class="ingredients__filling">
          <p>Начинка:</p>

          <ul class="ingredients__list">
            <li
              class="ingredients__item"
              v-for="item in pizzaCompound"
              :key="item.id"
            >
              <drag-n-drop
                :imageURL="item.image"
                :pizzaArea="pizzaArea"
                @addIngredient="setIngredient(1, item)"
              >
                <span :class="['filling', setIngredientClass(item.image)]">
                  {{ item.name }}
                </span>
              </drag-n-drop>
              <item-counter
                :itemCount="item.count"
                @toggleCounter="setIngredient($event, item)"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { sauces, ingredients } from "../../../static/pizza.json";
import ItemCounter from "../../../common/components/ItemCounter";
import SelectorItem from "../../../common/components/SelectorItem";
import RadioButton from "../../../common/components/RadioButton";
import DragNDrop from "./DragNDrop";

export default {
  name: "BuilderIngredientsSelector",
  components: {
    ItemCounter,
    SelectorItem,
    RadioButton,
    DragNDrop,
  },
  props: {
    submitState: {
      type: Boolean,
      required: true,
    },
    pizzaArea: {
      required: true,
    },
  },
  data() {
    return {
      sauces,
      ingredients,
      pizzaCompound: [],
    };
  },
  methods: {
    setCompound() {
      this.pizzaCompound.splice(0, this.pizzaCompound.length);
      class Compound {
        constructor(id, name, image, price) {
          this.id = id;
          this.name = name;
          this.image = image;
          this.price = price;
          this.count = 0;
        }
      }
      ingredients.forEach((item) => {
        this.pizzaCompound.push(
          new Compound(item.id, item.name, item.image, item.price)
        );
      });
    },
    setIngredientClass(image) {
      const ingredientArr = image.split("/");
      const ingredientName =
        ingredientArr[ingredientArr.length - 1].split(".")[0];
      return "filling--" + ingredientName;
    },
    selectSauce(sauce) {
      this.$emit("selectSauce", sauce);
    },
    setIngredient(count, ingredient) {
      ingredient.count += count;
      this.$emit("setIngredient", {
        ingredient: ingredient,
        type: count,
      });
    },
  },
  watch: {
    submitState() {
      if (this.submitState) {
        this.setCompound();
      }
    },
  },
  mounted() {
    this.selectSauce(sauces[1]);
    this.setCompound();
  },
};
</script>

<style scoped></style>
