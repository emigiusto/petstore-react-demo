//Receives an String and returns the same string with the first letter capitalized. 
// Example: capitalizeFirstLetter("example") ---> "Example"
export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/*Converts strings from the query params to display on DOM
// DEPRECATED
export function filterNameConverter(paramNameOfFilter) {
        let correctName;
        switch (paramNameOfFilter) {
            case "dogfood":
                correctName = "Dog Food"
                break;
            case "catfood":
                correctName = "Cat Food"
                break;
            case "cannedcatfood":
                    correctName = "Canned Cat Food"
                    break;
            default:
                correctName = paramNameOfFilter ? paramNameOfFilter.toUpperCase() : ""
                break;
        }
        return correctName
    }
*/