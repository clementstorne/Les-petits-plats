/**
 * Turn a string of <li> items into an array.
 * @param   {string}    string  Initial string
 * @return  {string[]}          Array of strings
 */
function turnIntoList(string) {
  return string.split("</li><li>");
}

/**
 * Remove or modify special characters from a string.
 * @param   {string}  string  Initial string
 * @return  {string}          String with no special characters
 */
function replaceCharacter(string) {
  const specialCharacters = [
    /à/g,
    /â/g,
    /é/g,
    /è/g,
    /ê/g,
    /î/g,
    /ù/g,
    /ç/g,
    /'/g,
    /,/g,
  ];
  const modifiedCharacters = ["a", "a", "e", "e", "e", "i", "u", "c", "", ""];
  for (let i = 0; i < specialCharacters.length; i++) {
    string = string.replace(specialCharacters[i], modifiedCharacters[i]);
  }
  return string;
}
