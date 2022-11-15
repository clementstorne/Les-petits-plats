import { recipes } from "../data/recipes.js";

class App {
  constructor() {
    this.recipeGrid = document.querySelector("main");
  }

  main() {
    const Recipes = recipes.map((recipe) => new Recipe(recipe));

    Recipes.forEach((recipe) => {
      const Template = new RecipeCard(recipe);
      this.recipeGrid.appendChild(Template.createRecipeCard());
    });
  }
}

const app = new App();
app.main();
