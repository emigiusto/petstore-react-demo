//Converts an array of arrays of type [ [key1, value1], [key2, value2], ...] to an object {key1: value1, key2: value2, ...}
// Useful when converting query string parameters to object data type ;)
// Example: paramsToObject([ ["breed", "giant"],["type", "dogfood"] ]) ---> {"breed": "giant", "type": "dogfood"}
export function paramsToObject(entries) {
    const result = {}
    for (const [key, value] of entries) { // each 'entry' is a [key, value] tupple
        result[key] = value.toLowerCase().trim().replace(/\s/g, '');
    }
    return result;
}