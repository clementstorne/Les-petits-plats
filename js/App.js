import { recipes } from "../data/recipes.js";

const FILTERS = ["ingredients", "appliance", "utensils"];

/**
 * Delete all the duplications in an array.
 * @param   {array}  list  Initial array with potential duplications
 * @return  {array}        Array without duplications
 */
function deleteDuplicateItems(list) {
  return list.filter((item, index) => list.indexOf(item) === index);
}

/**
 * Turn a list of strings into a list of <li> items.
 * @param   {string[]}  list  Initial array of strings
 * @return  {string[]}        Array of <li> items
 */
function turnIntoListOfItems(list) {
  const contentList = [];
  list.forEach((item) => {
    contentList.push(`<li>${item}</li>`);
  });
  return contentList;
}

/**
 * Expand the dropdown button.
 * @param   {string}  category  Allows to select which dropdown to expand ('ingredients', 'appliance' or 'utensils')
 */
function expandDropdown(category) {
  const label = document.getElementById(`${category}-label`);
  const input = document.getElementById(`${category}-input`);
  const icon = document.getElementById(`${category}-icon`);
  const ul = document.getElementById(`${category}-list`);

  label.style.width = "667px";
  icon.classList.remove("filter-icon-expand");
  icon.classList.add("filter-icon-reduce");
  input.style.visibility = "visible";
  ul.style.visibility = "visible";
}

/**
 * Reduce the dropdown button.
 * @param   {string}  category  Allows to select which dropdown to expand ('ingredients', 'appliance' or 'utensils')
 */
function reduceDropdown(category) {
  const label = document.getElementById(`${category}-label`);
  const input = document.getElementById(`${category}-input`);
  const icon = document.getElementById(`${category}-icon`);
  const ul = document.getElementById(`${category}-list`);

  label.style.width = null;
  input.style.visibility = null;
  ul.style.visibility = null;
  icon.classList.remove("filter-icon-reduce");
  icon.classList.add("filter-icon-expand");
}

/**
 * Reduce all the dropdown buttons except the one clicked.
 * @param   {string}  category  Category of the dropdown button that has been clicked ('ingredients', 'appliance' or 'utensils')
 */
function reduceAllOthersDropdowns(category) {
  FILTERS.forEach((filter) => {
    if (filter !== category) {
      reduceDropdown(filter);
    }
  });
}

class App {
  constructor() {
    this.recipeGrid = document.querySelector("main");
    this.tagList = document.querySelector(".tags-wrapper");
    this.filtersWrapper = document.querySelector(".filters-wrapper");
    this.displayedRecipes = [];
  }

  get Recipes() {
    return recipes.map((recipe) => new Recipe(recipe));
  }

  /**
   * Render the recipe cards on the page.
   * @param   {object[]}  Recipes   Array of Recipe objects
   */
  _renderRecipes(Recipes) {
    Recipes.forEach((recipe) => {
      const RecipeCard = new CardRecipe(recipe);
      this.recipeGrid.appendChild(RecipeCard.createCardRecipe());
    });
  }

  /**
   * Get all of the tags of a dropdown menu.
   * @param   {object[]}  Recipes   Array of Recipe objects
   * @param   {string}    category  Category of the dropdown ('ingredients', 'appliance' or 'utensils')
   * @return  {string[]}            Array of all tags to display in the dropdown menu
   */
  _getDropdownContentList(Recipes, category) {
    let list = [];
    Recipes.forEach((recipe) => {
      switch (category) {
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

  /**
   * Get all of the items of a dropdown menu.
   * @param   {string}    category  Category of the dropdown ('ingredients', 'appliance' or 'utensils')
   * @return  {string}              HTML content for the dropdown menu
   */
  _getDropdownContent(category) {
    return turnIntoListOfItems(
      this._getDropdownContentList(this.Recipes, category)
    ).join("");
  }

  /**
   * Render the dropdown button on the page.
   * @param   {string}    category         Category of the dropdown ('ingredients', 'appliance' or 'utensils')
   * @param   {string[]}  fullContentList  Array of all tags to display in the dropdown menu
   */
  _renderDropdown(category, fullContentList) {
    const dropdownFilter = new DropdownFactory(fullContentList, category);
    this.filtersWrapper.appendChild(dropdownFilter.createDropdown());
  }

  /**
   * On clic on the dropdown button, the dropdown menu expands.
   * @param   {string}  category  Category of the dropdown ('ingredients', 'appliance' or 'utensils')
   */
  _addDropdownLabelEvent(category) {
    document
      .getElementById(`${category}-label`)
      .addEventListener("click", (e) => {
        e.stopPropagation();
        e.preventDefault();
        reduceAllOthersDropdowns(category);
        expandDropdown(category);
      });
  }

  /**
   * On clic on the dropdown icon, the dropdown menu expands or drops.
   * @param   {string}  category  Category of the dropdown ('ingredients', 'appliance' or 'utensils')
   */
  _addDropdownToggleButtonEvent(category) {
    const icon = document.getElementById(`${category}-icon`);
    icon.addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (icon.classList.contains("filter-icon-reduce")) {
        reduceDropdown(category);
      } else {
        reduceAllOthersDropdowns(category);
        expandDropdown(category);
      }
    });
  }

  /**
   * Render a tag on the page.
   * @param   {string}  label     Label of the tag
   * @param   {string}  category  Category of the tag ('ingredients', 'appliance' or 'utensils')
   */
  _renderNewTag(label, category) {
    const newTag = new TagsFactory(`${label.innerText}`, `${category}`);
    this.tagList.appendChild(newTag.createTag());
  }

  /**
   * When no result is found, display a message and remove all tags from dropdown menus.
   */
  _noResultFound() {
    this.recipeGrid.innerHTML = "Aucune recette ne correspond à vos critères";
    FILTERS.forEach((filter) => {
      document.getElementById(`${filter}-list`).innerHTML = "";
    });
  }

  /**
   * Display results of the research
   * @param   {object[]}  list   Array of Recipe objects
   */
  _renderResults(list) {
    this.displayedRecipes = list;
    this._renderRecipes(this.displayedRecipes);
    this._updateAllDropdownMenusAfterResearch();
  }

  /**
   * When the user types 3 or more characters, recipes and dropdown menu tags are filtered.
   * If no result is found, a message is displayed.
   * If there are 2 or less characters, recipes and dropdown menus are reseted.
   */
  _addSearchbarEvent() {
    document.getElementById("search").addEventListener("keyup", (e) => {
      if (e.target.value.length > 2) {
        this.recipeGrid.innerHTML = "";
        const results = filterFromSearchnar(
          this.displayedRecipes,
          e.target.value
        );
        if (results.length < 1) {
          this._noResultFound();
        } else {
          this._renderResults(results);
          this._updateAllDropdownMenusAfterResearch();
          this._addSearchByTagEvent();
        }
      } else {
        this._resetAfterResearch();
      }
    });
  }

  /**
   * When the user choses a tag, recipes and dropdown menu tags are filtered.
   *
   */
  _addSearchByTagEvent() {
    FILTERS.forEach((filter) => {
      document.querySelectorAll(`#${filter}-list li`).forEach((tag) => {
        tag.addEventListener("click", () => {
          this._renderNewTag(tag, filter);
          this.recipeGrid.innerHTML = "";
          this.displayedRecipes = filterFromTag(
            this.displayedRecipes,
            tag.innerText
          );
          this._renderRecipes(this.displayedRecipes);
          this._updateAllDropdownMenusAfterResearch();
          this._addSearchbarEvent();
          this._addSearchByTagEvent();
        });
      });
    });
  }

  /**
   * Update the content of a dropdown menu with remaining recipes tags.
   * @param   {object[]}  Recipes   Array of Recipe objects
   * @param   {string}    category  Category of the dropdown ('ingredients', 'appliance' or 'utensils')
   */
  _updateDropdownMenuAfterResearch(Recipes, category) {
    document.getElementById(`${category}-list`).innerHTML = turnIntoListOfItems(
      this._getDropdownContentList(Recipes, `${category}`)
    ).join("");
  }

  /**
   * Update the content of all dropdown menus with remaining recipes tags.
   */
  _updateAllDropdownMenusAfterResearch() {
    FILTERS.forEach((filter) => {
      this._updateDropdownMenuAfterResearch(this.displayedRecipes, filter);
    });
  }

  /**
   * Reset the recipes and the dropdown menus.
   */
  _resetAfterResearch() {
    this.recipeGrid.innerHTML = "";
    this._renderRecipes(this.displayedRecipes);
    FILTERS.forEach((filter) => {
      document.getElementById(`${filter}-list`).innerHTML =
        this._getDropdownContent(`${filter}`);
    });
  }

  /**
   * Render all the elements on the page.
   */
  render() {
    this._renderRecipes(this.Recipes);
    this.displayedRecipes = this.Recipes;

    FILTERS.forEach((filter) => {
      this._renderDropdown(
        `${filter}`,
        this._getDropdownContentList(this.Recipes, `${filter}`)
      );
      this._addDropdownLabelEvent(filter);
      this._addDropdownToggleButtonEvent(filter);
    });

    this._addSearchbarEvent();
    this._addSearchByTagEvent();
  }
}

const app = new App();
app.render();
