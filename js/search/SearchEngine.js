/**
 * Filter recipes to match with the query.
 * @param   {object[]}  recipes  Array of Recipe objects
 * @param   {string}    query    String to match with in recipe name, ingredients list or description.
 * @return  {object[]}           Array of Recipe objects matching the query
 */
function filterFromSearchbar(recipes, query) {
  return recipes.filter((recipe) =>
    recipe.searchList.includes(query.toLowerCase())
  );
}

/**
 * Filter recipes to match with the selected tags.
 * @param   {object[]}  recipes      Array of Recipe objects
 * @param   {string[]}  filtersList  Array of the tags selected
 * @return  {object[]}               Array of Recipe objects containing the tags selected
 */
function filterFromTag(recipes, filtersList) {
  let result = recipes;
  filtersList.forEach((filter) => {
    result = result.filter((recipe) =>
      recipe.tagList.includes(filter.toLowerCase())
    );
  });
  return result;
}

/**
 * Filter the tags from the dropdown menu to match with the query.
 * @param   {string[]}  list   Array of strings
 * @param   {string}    query  String to keep in the array
 * @return  {string[]}         Array with only matching strings
 */
function filterTags(list, query) {
  return list.filter((elements) =>
    elements.toLowerCase().includes(query.toLowerCase())
  );
}
