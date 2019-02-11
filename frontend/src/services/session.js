/**
 * Stringify and save stuff in localStorage
 * @param {String} key what to save in localStorage
 * @param {Object} val an object to be stringified in localStorage
 */
export function saveSession(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

/**
 * Query localstorage and parse items
 * @param {String} key a key to grab an item and parse its value
 */
export function rehydrateSession(key) {
  let contents = localStorage.getItem(key);
  if (contents) {
    return JSON.parse(contents);
  }
}
