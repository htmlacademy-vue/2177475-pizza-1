import { sauces, dough, ingredients, sizes } from "../static/pizza.json";

export const normalizeSize = [];

(function () {
  sizes.forEach((item) => {
    let imgName;
    if (item.multiplier === 1) {
      imgName = "small";
    } else if (item.multiplier === 2) {
      imgName = "normal";
    } else {
      imgName = "big";
    }
    normalizeSize.push({
      ...item,
      imgName: imgName,
      state: item.multiplier === 3,
    });
  });
})();

export function togglePizzaState(array, item) {
  console.log(array);
  array.forEach((i) => {
    i.state = false;
  });
  item.state = true;
}

export const normalizeIngredient = [];

export function updateIngredient() {
  normalizeIngredient.splice(0, normalizeIngredient.length);
  ingredients.forEach((item) => {
    const ingredientArr = item.image.split("/");
    const imgName = ingredientArr[ingredientArr.length - 1].split(".")[0];
    normalizeIngredient.push({
      ...item,
      imgName: imgName,
      count: 0,
    });
  });
}
updateIngredient();

export const normalizeSauces = [];

(function () {
  sauces.forEach((sauce) => {
    normalizeSauces.push({
      ...sauce,
      state: sauce.id === 2,
    });
  });
})();

export const normalizeDough = [];

(function () {
  dough.forEach((item) => {
    normalizeDough.push({
      ...item,
      imgName: item.name === "Тонкое" ? "light" : "large",
      state: item.name === "Тонкое",
    });
  });
})();
