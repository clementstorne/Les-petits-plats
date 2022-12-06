class DropdownFactory {
  constructor(list, type) {
    switch (type) {
      case "ingredients":
        return new DropdownIngredients(list);
        break;
      case "appliance":
        return new DropdownAppliances(list);
        break;
      case "utensils":
        return new DropdownUtensils(list);
        break;
      default:
        throw "Unknown type format";
    }
  }
}
