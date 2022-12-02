function filterFromSearchbar(recipes, query) {
  return recipes.filter((recipe) =>
    recipe.searchList.includes(query.toLowerCase())
  );
}

function filterFromTag(recipes, filtersList) {
  let result = recipes;
  filtersList.forEach((filter) => {
    result = result.filter((recipe) =>
      recipe.tagList.includes(filter.toLowerCase())
    );
  });
  return result;
}
