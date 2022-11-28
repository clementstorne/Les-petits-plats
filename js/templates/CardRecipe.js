class CardRecipe {
  constructor(recipe) {
    this.name = recipe.name;
    this.time = recipe.time;
    this.ingredients = recipe.ingredients;
    this.description = recipe.description;

    this.card = document.createElement("div");
    this.card.classList.add("card");
  }

  get recipe() {
    return this.recipe;
  }

  createCardRecipe() {
    const ingredientsList = [];
    this.ingredients.forEach((ingredient) => {
      if (ingredient.unit === undefined && ingredient.quantity !== undefined) {
        ingredientsList.push(
          `<span class="ingredient">${ingredient.ingredient}:</span> ${ingredient.quantity} <br>`
        );
      } else if (
        ingredient.unit === undefined &&
        ingredient.quantity === undefined
      ) {
        ingredientsList.push(
          `<span class="ingredient">${ingredient.ingredient}</span><br>`
        );
      } else {
        ingredientsList.push(
          `<span class="ingredient">${ingredient.ingredient}:</span> ${ingredient.quantity} ${ingredient.unit} <br>`
        );
      }
    });
    const list = ingredientsList.join(",");

    const CardRecipe = `
        <div class="card-top">
        </div>
        <div class="card-bottom">
            <div class="card-bottom-header">
                <h2 class="name">${this.name}</h2>
                <div class="time">${this.time} min</div>
            </div>
            <div class="card-bottom-content">
                <div class="ingredients">${ingredientsList.join("")}</div>
                <div class="description">${this.description}</div>
            </div>
        </div>
        `;

    this.card.innerHTML = CardRecipe;

    return this.card;
  }
}
