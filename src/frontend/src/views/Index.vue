<template>
  <div id="app">
    <main class="content">
      <form action="#" method="post">
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>

          <builder-dough-selector
            :dough="dough"
            @selectDough="setDough($event)"
          />

          <builder-size-selector :sizes="sizes" @selectSize="setSize($event)" />

          <builder-ingredients-selector
            :pizzaArea="pizzaArea"
            :submitState="submitState"
            :ingredients="ingredients"
            :sauces="sauces"
            @selectSauce="setSauce($event)"
            @addIngredient="setIngredient($event)"
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
              @addIngredient="setIngredient($event)"
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
        if (item.id === data.id) {
          item.count += data.count;
          if (item.count === 0) {
            arr.splice(index, 1);
          }
          isItem = true;
        }
      });
      if (!isItem) {
        this.ingredients[data.id - 1].count += data.count;
        this.pizzaSetup.ingredients.push(this.ingredients[data.id - 1]);
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
  mounted() {
    this.setDough(this.dough[1]);
    this.setSize(this.sizes[2]);
    this.setSauce(this.sauces[1]);
  },
};
</script>

<style lang="scss" scoped></style>
