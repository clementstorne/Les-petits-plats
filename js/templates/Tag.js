class Tag {
  constructor(label) {
    this.label = label;

    this.tag = document.createElement("button");
    this.tag.classList.add("tag");
  }

  createTag() {
    this.tag.innerText = this.label;

    this.tag.addEventListener("click", () => {
      this.tag.remove();
    });

    return this.tag;
  }
}

class IngredientsTag extends Tag {
  constructor(label) {
    super(label);

    this.tag.classList.add("tag-ingredients");
  }
}

class ApplianceTag extends Tag {
  constructor(label) {
    super(label);

    this.tag.classList.add("tag-appliance");
  }
}

class UtensilsTag extends Tag {
  constructor(label) {
    super(label);

    this.tag.classList.add("tag-utensils");
  }
}
