<template>
  <div id="app">
    <main class="content">
      <form action="#" method="post">
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>

          <builder-dough-selector
            :dough="dough"
            :selectedDough="pizzaSetup.dough"
            @selectDough="setDough($event)"
          />

          <builder-size-selector
            :sizes="sizes"
            :selectedSize="pizzaSetup.size"
            @selectSize="setSize($event)"
          />

          <builder-ingredients-selector
            :ingredients="ingredients"
            :selectedIngredients="pizzaSetup.ingredients"
            :sauces="sauces"
            :selectedSauce="pizzaSetup.sauce"
            @selectSauce="setSauce($event)"
            @countIngredient="countIngredient($event)"
          />

          <div class="content__pizza">
            <label class="input">
              <span class="visually-hidden">Название пиццы</span>
              <input
                type="text"
                name="pizza_name"
                placeholder="Введите название пиццы"
                v-model="pizzaName"
              />
            </label>

            <builder-pizza-view
              :pizzaSetup="pizzaSetup"
              @countIngredient="countIngredient($event)"
            />

            <builder-price-counter
              :pizzaPrice="fullPrice"
              :pizzaName="pizzaName"
              :ingredients="pizzaSetup.ingredients"
              @pizzaSubmit="pizzaSubmit"
            />
          </div>
        </div>
      </form>
    </main>
  </div>
</template>

<script>
import {
  normalizeDough as dough,
  normalizeSize as sizes,
  normalizeSauces as sauces,
  normalizeIngredient as ingredients,
} from "@/common/helper";
import BuilderDoughSelector from "../modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "../modules/builder/components/BuilderSizeSelector";
import BuilderIngredientsSelector from "../modules/builder/components/BuilderIngredientsSelector";
import BuilderPizzaView from "../modules/builder/components/BuilderPizzaView";
import BuilderPriceCounter from "../modules/builder/components/BuilderPriceCounter";

export default {
  name: "Index",
  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
    BuilderPriceCounter,
  },
  data() {
    return {
      ingredients,
      sauces,
      sizes,
      dough,
      pizzaSetup: {
        dough: dough[1],
        size: sizes[2],
        sauce: sauces[1],
        ingredients: [],
      },
      pizzaName: "",
    };
  },
  methods: {
    setDough(item) {
      this.pizzaSetup.dough = item;
    },
    setSize(size) {
      this.pizzaSetup.size = size;
    },
    setSauce(sauce) {
      this.pizzaSetup.sauce = sauce;
    },
    countIngredient(data) {
      const ingredientIndex = this.pizzaSetup.ingredients.findIndex((item) => {
        return item.id === data.item.id;
      });
      if (ingredientIndex === -1) {
        this.pizzaSetup.ingredients.push({
          ...data.item,
          count: 1,
        });
      } else {
        this.pizzaSetup.ingredients[ingredientIndex].count += data.count;
        if (this.pizzaSetup.ingredients[ingredientIndex].count === 0) {
          this.pizzaSetup.ingredients.splice(ingredientIndex, 1);
        }
      }
    },
    pizzaSubmit() {
      this.$emit("pizzaSubmit", this.fullPrice);
      this.clearPizza();
    },
    clearPizza() {
      this.pizzaSetup.ingredients = [];
      this.pizzaName = "";
    },
  },
  computed: {
    fullPrice() {
      let price = 0;
      price += this.pizzaSetup.dough.price;
      price += this.pizzaSetup.sauce.price;
      if (this.pizzaSetup.ingredients) {
        let ingredientsPrice = 0;
        this.pizzaSetup.ingredients.forEach((item) => {
          ingredientsPrice += item.price * item.count;
        });
        price += ingredientsPrice;
      }
      price *= this.pizzaSetup.size.multiplier;
      return price;
    },
  },
};
</script>

<style lang="scss" scoped></style>
