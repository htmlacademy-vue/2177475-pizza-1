<template>
  <div id="app">
    <main class="content">
      <form action="#" method="post">
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>

          <builder-dough-selector @selectDough="setDough($event)" />

          <builder-size-selector @selectSize="setSize($event)" />

          <builder-ingredients-selector
            :pizzaArea="pizzaArea"
            :submitState="submitState"
            @selectSauce="setSauce($event)"
            @setIngredient="setIngredient($event)"
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
              @setPizzaArea="setPizzaArea($event)"
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
import { ingredients, sauces, sizes } from "../static/pizza.json";
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
      pizzaSetup: {
        dough: {},
        size: {},
        sauce: {},
        ingredients: [],
      },
      pizzaName: "",
      submitState: false,
      pizzaArea: null,
    };
  },
  methods: {
    setDough(dough) {
      this.pizzaSetup.dough = dough;
    },
    setSize(size) {
      this.pizzaSetup.size = size;
    },
    setSauce(sauce) {
      this.pizzaSetup.sauce = sauce;
    },
    setIngredient(data) {
      let isItem = false;
      this.pizzaSetup.ingredients.forEach((item, index, arr) => {
        if (item.id === data.ingredient.id) {
          if (item.count === 0) {
            arr.splice(index, 1);
          }
          isItem = true;
        }
      });
      if (!isItem) {
        this.pizzaSetup.ingredients.push(data.ingredient);
      }
    },
    pizzaSubmit() {
      this.$emit("pizzaSubmit", this.fullPrice);
      this.clearPizza();
      this.submitState = true;
      setTimeout(() => {
        this.submitState = false;
      }, 250);
    },
    clearPizza() {
      this.pizzaSetup.ingredients = [];
      this.pizzaName = "";
    },
    setPizzaArea(area) {
      this.pizzaArea = area;
    },
  },
  computed: {
    fullPrice() {
      let price = 0;
      if (this.pizzaSetup.dough.price) {
        price += this.pizzaSetup.dough.price;
      }
      if (this.pizzaSetup.sauce.price) {
        price += this.pizzaSetup.sauce.price;
      }
      if (this.pizzaSetup.ingredients) {
        let ingredientsPrice = 0;
        this.pizzaSetup.ingredients.forEach((item) => {
          ingredientsPrice += item.price * item.count;
        });
        price += ingredientsPrice;
      }
      if (this.pizzaSetup.size.multiplier) {
        price *= this.pizzaSetup.size.multiplier;
      }
      return price;
    },
  },
};
</script>

<style lang="scss" scoped></style>
