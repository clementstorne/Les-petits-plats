class CardRecipe {
  constructor(recipe) {
    this.name = recipe.name;
    this.time = recipe.time;
    this.ingredients = recipe.ingredients;
    this.description = recipe.description;
    this.image = recipe.image;

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

    const cardTop = document.createElement("div");
    cardTop.classList.add("card-top");
    this.card.appendChild(cardTop);

    const img = document.createElement("img");
    img.classList.add("card-top-img");
    img.setAttribute("src", this.image);
    img.setAttribute("alt", this.name);
    cardTop.appendChild(img);

    const cardBottom = document.createElement("div");
    cardBottom.classList.add("card-bottom");
    this.card.appendChild(cardBottom);

    const cardBottomHeader = document.createElement("div");
    cardBottomHeader.classList.add("card-bottom-header");
    cardBottom.appendChild(cardBottomHeader);

    const title = document.createElement("h2");
    title.classList.add("name");
    title.innerHTML = this.name;
    cardBottomHeader.appendChild(title);

    const time = document.createElement("div");
    time.classList.add("time");
    time.innerHTML = `${this.time} min`;
    cardBottomHeader.appendChild(time);

    const cardBottomContent = document.createElement("div");
    cardBottomContent.classList.add("card-bottom-content");
    cardBottom.appendChild(cardBottomContent);

    const ingredients = document.createElement("div");
    ingredients.classList.add("ingredients");
    ingredients.innerHTML = ingredientsList.join("");
    cardBottomContent.appendChild(ingredients);

    const description = document.createElement("div");
    description.classList.add("description");
    description.innerText = this.description;
    cardBottomContent.appendChild(description);

    // const CardRecipe = `
    //     <div class="card-top">
    //     <img class="card-top-img" src="./images/recipes/brownies.jpeg" alt="" />
    //     </div>
    //     <div class="card-bottom">
    //         <div class="card-bottom-header">
    //             <h2 class="name">${this.name}</h2>
    //             <div class="time">${this.time} min</div>
    //         </div>
    //         <div class="card-bottom-content">
    //             <div class="ingredients">${ingredientsList.join("")}</div>
    //             <div class="description">${this.description}</div>
    //         </div>
    //     </div>
    //     `;

    // this.card.innerHTML = CardRecipe;

    return this.card;
  }
}
