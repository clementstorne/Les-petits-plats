/**
 * Filter an array of objects such that a property matches with the query.
 * If there is no propertyToTest parameter, filter an array of strings to match with the query.
 * @param   {string}     query               String to match
 * @param   {object[]}   dataToFilter        Array of objects to filter
 * @param   {string}    [propertyToTest=""]  Property of the objects to test with the regex
 * @return  {object[]}                       Array of objects filtered
 */
function regexSearch(query, dataToFilter, propertyToTest = "") {
  let resultList = [];
  let regex = new RegExp(query, "i");

  if (propertyToTest === "") {
    for (let object of dataToFilter) {
      if (regex.test(object)) {
        resultList.push(object);
      }
    }
    return resultList;
  } else {
    for (let object of dataToFilter) {
      if (regex.test(object[propertyToTest])) {
        resultList.push(item);
      }
    }
    return resultList;
  }
}

/**
 * Filter recipes to match with the query.
 * @param   {object[]}  recipes  Array of Recipe objects
 * @param   {string}    query    String to match with in recipe name, ingredients list or description.
 * @return  {object[]}           Array of Recipe objects matching the query
 */
function filterFromSearchbar(recipes, query) {
  return regexSearch(query, recipes, "searchList");
}

/**
 * Filter recipes to match with the selected tags.
 * @param   {object[]}  recipes      Array of Recipe objects
 * @param   {string[]}  filtersList  Array of the tags selected
 * @return  {object[]}               Array of Recipe objects containing the tags selected
 */
function filterFromTag(recipes, filtersList) {
  let result = recipes;
  for (let filter of filtersList) {
    result = regexSearch(filter, result, "tagList");
  }
  return result;
}

/**
 * Filter the tags from the dropdown menu to match with the query.
 * @param   {string[]}  list   Array of strings
 * @param   {string}    query  String to keep in the array
 * @return  {string[]}         Array with only matching strings
 */
function filterTags(list, query) {
  return regexSearch(query, list);
}
