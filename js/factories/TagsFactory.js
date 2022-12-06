class TagsFactory {
  constructor(label, type) {
    switch (type) {
      case "ingredients":
        return new IngredientsTag(label);
        break;
      case "appliance":
        return new ApplianceTag(label);
        break;
      case "utensils":
        return new UtensilsTag(label);
        break;
      default:
        throw "Unknown type format";
    }
  }
}
