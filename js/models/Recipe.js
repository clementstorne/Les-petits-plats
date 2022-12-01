class Recipe {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.servings = data.servings;
    this.ingredients = data.ingredients;
    this.time = data.time;
    this.description = data.description;
    this.appliance = data.appliance;
    this.utensils = data.ustensils;
  }

  get ingredientsList() {
    const list = [];
    this.ingredients.forEach((object) => list.push(object.ingredient));
    return list;
  }

  get appliancesList() {
    return [this.appliance];
  }
  get ustensilsList() {
    return this.utensils;
  }

  get searchList() {
    const list = [this.name].concat(this.ingredientsList, this.description);
    return list.join().toLocaleLowerCase();
  }

  get tagList() {
    const list = this.ingredientsList.concat(
      this.appliancesList,
      this.ustensilsList
    );
    return list.join().toLocaleLowerCase();
  }
}
