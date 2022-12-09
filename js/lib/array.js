/**
 * Delete all the duplications in an array.
 * @param   {array}  list  Initial array with potential duplications
 * @return  {array}        Array without duplications
 */
function deleteDuplicateItems(list) {
  return list.filter((item, index) => list.indexOf(item) === index);
}

/**
 * Delete an item from an array.
 * @param   {*}      itemToDelete  Item to delete
 * @param   {array}  list          Array in which the item has to be deleted
 * @return  {array}                Array without the item
 */
function deleteItemFromArray(itemToDelete, list) {
  const index = list.indexOf(itemToDelete);
  if (index !== -1) {
    list.splice(index, 1);
  }
  return list;
}

/**
 * Turn an array of strings into a array of <li> items.
 * @param   {string[]}  list  Initial array of strings
 * @return  {string[]}        Array of <li> items
 */
function turnIntoListOfItems(list) {
  const contentList = [];
  list.forEach((item) => {
    contentList.push(`<li>${item}</li>`);
  });
  return contentList;
}

// export { deleteDuplicateItems, deleteItemFromArray, turnIntoListOfItems };
