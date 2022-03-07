//Converts entries of type [ [key, value], ...] to {key1: value1, key2: value2...}
export function paramsToObject(entries) {
    const result = {}
    for (const [key, value] of entries) { // each 'entry' is a [key, value] tupple
        result[key] = value.toLowerCase().trim().replace(/\s/g, '');
    }
    return result;
}