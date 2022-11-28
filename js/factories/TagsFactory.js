class TagsFactory {
  constructor(label, type) {
    if (type === "ingredients") {
      return new IngredientsTag(label);
    } else if (type === "appliance") {
      return new ApplianceTag(label);
    } else if (type === "utensils") {
      return new UtensilsTag(label);
    } else {
      throw "Unknown type format";
    }
  }
}
