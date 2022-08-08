export const normalizeSize = (size) => {
  return {
    ...size,
    name: () => {
      if (size.multiplier === 1) {
        return "small";
      } else if (size.multiplier === 2) {
        return "normal";
      } else {
        return "big";
      }
    },
  };
};

export const ingredientTranslateName = (ingredient) => {
  return {
    ...ingredient,
    name: () => {
      const ingredientArr = ingredient.image.split("/");
      return ingredientArr[ingredientArr.length - 1].split(".")[0];
    },
  };
};

export const doughTranslateName = (dough) => {
  return {
    ...dough,
    name: dough.name === "Тонкое" ? "light" : "large",
  };
};
