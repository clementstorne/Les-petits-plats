class Dropdown {
  constructor(list) {
    this.list = list;
    this.title = "";
    this.dropdownId = "";
    this.inputId = "";
    this.iconId = "";
    this.inputPlaceholder = "";
    this.listId = "";

    this.dropdown = document.createElement("div");
    this.dropdown.classList.add("filter");
  }

  get content() {
    const contentList = [];
    this.list.forEach((item) => {
      contentList.push(`<li>${item}</li>`);
    });
    return contentList.join("");
  }

  createDropdown() {
    const label = document.createElement("label");
    label.classList.add("filter-label");
    label.setAttribute("id", `${this.dropdownId}`);
    label.setAttribute("for", `${this.inputId}`);
    this.dropdown.appendChild(label);

    const span = document.createElement("span");
    span.innerText = `${this.title}`;
    label.appendChild(span);

    const icon = document.createElement("i");
    icon.classList.add("filter-icon", "filter-icon-expand");
    icon.setAttribute("id", `${this.iconId}`);
    label.appendChild(icon);

    const input = document.createElement("input");
    input.classList.add("filter-input");
    input.setAttribute("type", "text");
    input.setAttribute("id", `${this.inputId}`);
    input.setAttribute("placeholder", `${this.inputPlaceholder}`);
    label.appendChild(input);

    const ul = document.createElement("ul");
    ul.classList.add("filter-list");
    ul.setAttribute("id", `${this.listId}`);
    ul.innerHTML = `${this.content}`;
    this.dropdown.appendChild(ul);

    return this.dropdown;
  }
}

class DropdownIngredients extends Dropdown {
  constructor(list) {
    super(list);
    this.title = "Ingrédients";
    this.dropdownId = "ingredients-label";
    this.inputId = "ingredients-input";
    this.iconId = "ingredients-icon";
    this.inputPlaceholder = "Rechercher un ingrédient";
    this.listId = "ingredients-list";
  }
}

class DropdownAppliances extends Dropdown {
  constructor(list) {
    super(list);
    this.title = "Appareils";
    this.dropdownId = "appliance-label";
    this.inputId = "appliance-input";
    this.iconId = "appliance-icon";
    this.inputPlaceholder = "Rechercher un appareil";
    this.listId = "appliance-list";
  }
}

class DropdownUtensils extends Dropdown {
  constructor(list) {
    super(list);
    this.title = "Ustensiles";
    this.dropdownId = "utensils-label";
    this.inputId = "utensils-input";
    this.iconId = "utensils-icon";
    this.inputPlaceholder = "Rechercher un ustensile";
    this.listId = "utensils-list";
  }
}
