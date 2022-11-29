// import { recipes } from "../../data/recipes.js";

// const Recipes = recipes.map((recipe) => new Recipe(recipe));

// const result = filterRecipes(Recipes, "gla");
// console.log(result);

function filterRecipes(recipes, query) {
  return recipes.filter((recipe) =>
    recipe.searchList.includes(query.toLowerCase())
  );
}
