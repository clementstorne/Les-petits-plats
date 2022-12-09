import { recipes } from "../data/recipes.js";

// import {
//   deleteDuplicateItems,
//   deleteItemFromArray,
//   turnIntoListOfItems,
// } from "./lib/array";

const FILTERS = ["ingredients", "appliance", "utensils"];

class App {
  constructor() {
    this.recipeGrid = document.querySelector("main");
    this.tagList = document.querySelector(".tags-wrapper");
    this.filtersWrapper = document.querySelector(".filters-wrapper");
    this.displayedRecipes = [];
    this.filtersList = [];
  }

  get Recipes() {
    return recipes.map((recipe) => new Recipe(recipe));
  }

  /**
   * On clic outside of an expanded dropdown, that one is reduced.
   */
  _addReduceAllDropdownsEvent() {
    document.querySelector("body").addEventListener("click", () => {
      reduceAllOthersDropdowns("none");
    });
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
  _addDropdownLabelClicEvent(category) {
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
  _addDropdownToggleButtonClicEvent(category) {
    const icon = document.getElementById(`${category}-icon`);
    icon.addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (icon.classList.contains("filter-icon-reduce")) {
        reduceDropdown(category);
      } else {
        reduceAllOthersDropdowns(category);
        expandDropdown(category);
        document.querySelector(`#${category}-input`).focus();
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
    this.recipeGrid.innerHTML = "";
    document.querySelector(".message-wrapper").innerHTML =
      "Aucune recette ne correspond à vos critères";
    FILTERS.forEach((filter) => {
      document.getElementById(`${filter}-list`).innerHTML = "";
    });
  }

  /**
   * Display a message which indicates how much recipes are found
   */
  _displayNumberOfResults(number) {
    let message = document.querySelector(".message-wrapper");
    if (number === 0) {
      this._noResultFound();
    } else if (number === 1) {
      message.innerHTML = "1 recette correspond à vos critères";
    } else {
      message.innerHTML = `${number} recettes correspondent à vos critères`;
    }
  }

  /**
   * Display results of the research
   * @param   {object[]}  list   Array of Recipe objects
   */
  _renderResults(list) {
    this.recipeGrid.innerHTML = "";
    this._displayNumberOfResults(list.length);
    this.displayedRecipes = list;
    this._renderRecipes(this.displayedRecipes);
    this._updateAllDropdownMenusAfterResearch();
  }

  /**
   * Filter recipes by searchbar. Then display results on the page.
   * @param   {object[]}  Recipes   Array of Recipe objects
   */
  _filterBySearchbarAndDisplayResults(Recipes) {
    this.displayedRecipes = filterFromSearchbar(
      Recipes,
      document.getElementById("search").value
    );
    this._renderResults(this.displayedRecipes);
    this._addSearchbarEvent();
    this._addSearchByTagEvent();
    this._addCloseTagEvent();
  }

  /**
   * When the user types 3 or more characters, recipes and dropdown menu tags are filtered.
   * If no result is found, a message is displayed.
   * If there are 2 or less characters, recipes and dropdown menus are reseted.
   */
  _addSearchbarEvent() {
    document.getElementById("search").addEventListener("keyup", (e) => {
      if (e.target.value.length > 2 && this.filtersList.length == 0) {
        const results = filterFromSearchbar(this.Recipes, e.target.value);
        this._updateAllDropdownMenusAfterResearch();
        if (results.length > 0) {
          this.displayedRecipes = results;
          this._renderResults(this.displayedRecipes);
          this._addSearchByTagEvent();
        } else {
          this._displayNumberOfResults(0);
          this._noResultFound();
        }
      } else if (e.target.value.length > 2 && this.filtersList.length > 0) {
        const results = filterFromSearchbar(
          this.displayedRecipes,
          e.target.value
        );
        this._updateAllDropdownMenusAfterResearch();
        if (results.length > 0) {
          this.displayedRecipes = results;
          this._renderResults(this.displayedRecipes);
          this._addSearchByTagEvent();
        } else {
          this._displayNumberOfResults(0);
          this._noResultFound();
        }
      } else if (this.filtersList.length > 0) {
        this.displayedRecipes = filterFromTag(this.Recipes, this.filtersList);
        this._renderResults(this.displayedRecipes);
        this._addSearchByTagEvent();
      } else {
        this._resetAfterResearch();
      }
    });
  }

  /**
   * Filter recipes by tag. Then display results on the page.
   * @param   {object[]}  Recipes   Array of Recipe objects
   */
  _filterByTagAndDisplayResults(Recipes) {
    this.displayedRecipes = filterFromTag(Recipes, this.filtersList);
    this._renderResults(this.displayedRecipes);
    this._addSearchbarEvent();
    this._addSearchByTagEvent();
    this._addCloseTagEvent();
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
          this.filtersList.push(tag.innerText);
          this._filterByTagAndDisplayResults(this.displayedRecipes);
          document.querySelector(`#${filter}-input`).value = "";
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
    this._renderRecipes(this.Recipes);
    document.querySelector(".message-wrapper").innerHTML = "";
    FILTERS.forEach((filter) => {
      document.getElementById(`${filter}-list`).innerHTML =
        this._getDropdownContent(`${filter}`);
    });
  }

  /**
   * Filter recipes by searchbar and tag. Then display results on the page.
   * @param   {object[]}  Recipes   Array of Recipe objects
   */
  _filterByTagAndSearchbarAndDisplayResults() {
    this.displayedRecipes = filterFromTag(this.Recipes, this.filtersList);
    this.displayedRecipes = filterFromSearchbar(
      this.displayedRecipes,
      document.getElementById("search").value
    );
    this._renderResults(this.displayedRecipes);
    this._addSearchbarEvent();
    this._addSearchByTagEvent();
    this._addCloseTagEvent();
  }

  /**
   * On close of a tag, recipe and dropdown menus are updated.
   */
  _addCloseTagEvent() {
    const tags = document.querySelectorAll(".tag");
    tags.forEach((tag) => {
      tag.addEventListener("click", (e) => {
        deleteItemFromArray(e.target.innerText, this.filtersList);
        if (
          this.filtersList.length > 0 &&
          document.getElementById("search").value.length > 2
        ) {
          this._filterByTagAndSearchbarAndDisplayResults();
        } else if (this.filtersList.length > 0) {
          this._filterByTagAndDisplayResults(this.Recipes);
        } else if (document.getElementById("search").value.length > 2) {
          this._filterBySearchbarAndDisplayResults(this.Recipes);
        } else {
          this.displayedRecipes = this.Recipes;
          this._renderResults(this.displayedRecipes);
          this._addSearchByTagEvent();
        }
      });
    });
  }

  /**
   * When the user types a character in a dropdown input, the dropdown menu is updated with matching tags
   */
  _addDropdownInputEvent() {
    FILTERS.forEach((category) => {
      document
        .querySelectorAll(`#${category}-input`)
        .forEach((dropdownInput) => {
          dropdownInput.addEventListener("keyup", (e) => {
            if (e.target.value.length === 0) {
              this._updateDropdownMenuAfterResearch(
                this.displayedRecipes,
                `${category}`
              );
              this._addSearchByTagEvent();
            } else {
              document.getElementById(`${category}-list`).innerHTML =
                turnIntoListOfItems(
                  filterTags(
                    this._getDropdownContentList(this.Recipes, category),
                    e.target.value
                  )
                ).join("");
              this._addSearchByTagEvent();
            }
          });
        });
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
      this._addDropdownLabelClicEvent(filter);
      this._addDropdownToggleButtonClicEvent(filter);
    });

    this._addReduceAllDropdownsEvent();

    this._addSearchbarEvent();
    this._addDropdownInputEvent();
    this._addSearchByTagEvent();
  }
}

const app = new App();
app.render();
