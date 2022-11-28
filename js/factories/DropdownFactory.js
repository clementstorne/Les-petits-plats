class DropdownFactory {
  constructor(list, type) {
    if (type === "ingredients") {
      return new DropdownIngredients(list);
    } else if (type === "appliance") {
      return new DropdownAppliances(list);
    } else if (type === "utensils") {
      return new DropdownUtensils(list);
    } else {
      throw "Unknown type format";
    }
  }
}
