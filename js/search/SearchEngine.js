function filterFromSearchnar(recipes, query) {
  return recipes.filter((recipe) =>
    recipe.searchList.includes(query.toLowerCase())
  );
}

function filterFromTag(recipes, tag) {
  const result = recipes.filter((recipe) =>
    recipe.tagList.includes(tag.toLowerCase())
  );
  return result;
}
