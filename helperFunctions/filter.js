/*  Function that receives a dataset ([{Product1},{Product2},..]) and a filterObject ({...}) and returns a filtered array ([{Product1},{Product2},..])
    filterObject has the form of: {key1: value1, key2: value2, ..} Example:
    {
        "breed" : "giant",
        "sterilized": true
    }
*/
export function filterProducts(data, filterObject) {
    return data.filter((function (item) {
        //Iterating through all filterObject keys
        for (const [key, value] of Object.entries(filterObject)) {
            if (typeof item[key] == "string") {
                if (item[key].toLowerCase().trim().replace(/\s/g, '') != value && value != "all") return false;
            } else {
                //Numeric and boolean values 
                if (item[key] != value) return false;
            }
        }
        return true
    }))
}