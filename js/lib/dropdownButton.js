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
function reduceAllOthersDropdowns(selectedCategory) {
  ["ingredients", "appliance", "utensils"].forEach((category) => {
    if (category !== selectedCategory) {
      reduceDropdown(category);
    }
  });
}
