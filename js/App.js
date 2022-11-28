import { recipes } from "../data/recipes.js";

const FILTERS = ["ingredients", "appliance", "utensils"];

function deleteDuplicateItems(list) {
  return list.filter((item, index) => list.indexOf(item) === index);
}

function getList(type) {
  const Recipes = recipes.map((recipe) => new Recipe(recipe));
  let list = [];

  Recipes.forEach((recipe) => {
    switch (type) {
      case "ingredients":
        list = list.concat(recipe.ingredientsList);
        break;
      case "appliance":
        list = list.concat(recipe.appliancesList);
        break;
      case "utensils":
        list = list.concat(recipe.ustensilsList);
        break;
    }
  });
  list = deleteDuplicateItems(list).sort();

  return list;
}

function expandDropdown(filter) {
  const label = document.getElementById(`${filter}-label`);
  const input = document.getElementById(`${filter}-input`);
  const icon = document.getElementById(`${filter}-icon`);
  const ul = document.getElementById(`${filter}-list`);

  label.style.width = "667px";
  icon.classList.remove("filter-icon-expand");
  icon.classList.add("filter-icon-reduce");
  input.style.visibility = "visible";
  ul.style.visibility = "visible";
}

function reduceDropdown(filter) {
  const label = document.getElementById(`${filter}-label`);
  const input = document.getElementById(`${filter}-input`);
  const icon = document.getElementById(`${filter}-icon`);
  const ul = document.getElementById(`${filter}-list`);

  label.style.width = null;
  input.style.visibility = null;
  ul.style.visibility = null;
  icon.classList.remove("filter-icon-reduce");
  icon.classList.add("filter-icon-expand");
}

function reduceAllOthersDropdowns(clickedFilter) {
  FILTERS.forEach((filter) => {
    if (filter !== clickedFilter) {
      reduceDropdown(filter);
    }
  });
}

class App {
  constructor() {
    this.recipeGrid = document.querySelector("main");
    this.tagList = document.querySelector(".tags-wrapper");
    this.filtersWrapper = document.querySelector(".filters-wrapper");
  }

  render() {
    const Recipes = recipes.map((recipe) => new Recipe(recipe));
    Recipes.forEach((recipe) => {
      const RecipeCard = new CardRecipe(recipe);
      this.recipeGrid.appendChild(RecipeCard.createCardRecipe());
    });

    FILTERS.forEach((filter) => {
      let list = getList(`${filter}`);
      const dropdownFilter = new DropdownFactory(list, `${filter}`);
      this.filtersWrapper.appendChild(dropdownFilter.createDropdown());

      const label = document.getElementById(`${filter}-label`);
      const icon = document.getElementById(`${filter}-icon`);

      label.addEventListener("click", (e) => {
        e.stopPropagation();
        e.preventDefault();
        reduceAllOthersDropdowns(filter);
        expandDropdown(filter);
      });

      icon.addEventListener("click", (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (icon.classList.contains("filter-icon-reduce")) {
          reduceDropdown(filter);
        } else {
          reduceAllOthersDropdowns(filter);
          expandDropdown(filter);
        }
      });
      document.querySelectorAll(`#${filter}-list li`).forEach((label) => {
        label.addEventListener("click", () => {
          const newTag = new TagsFactory(`${label.innerText}`, `${filter}`);
          this.tagList.appendChild(newTag.createTag());
        });
      });
    });
  }
}

const app = new App();
app.render();
