/**
 * Turn a string of <li> items into an array.
 * @param   {string}    string  Initial array of strings
 * @return  {string[]}          Array of strings
 */
function turnIntoList(string) {
  return string.split("</li><li>");
}
