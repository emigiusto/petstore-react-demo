//Filter dataset by any {key1: value1, key2: value2, ..} passed in filterObject
export function filterProducts(data, filterObject) {
    return data.filter((function (item) {
        //Iterating through all filterObject keys
        for (const [key, value] of Object.entries(filterObject)) {
            if (typeof item[key] == "string") {
                if (item[key].toLowerCase().trim().replace(/\s/g, '') != value && value != "all") return false;
            } else {
                //Numeric values
                if (item[key] != value) return false;
            }
        }
        return true
    }))
}