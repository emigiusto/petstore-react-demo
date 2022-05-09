import React from 'react'

function SelectFilter({filter}, updateFilters) {

    const handleFilterSelection = (filter,option) =>{
        console.log(filter,option)
        updateFilters(filter,option)
    }

    return (
        <div>
            <button>{filter.value}</button>
            <ul  aria-labelledby="dropdownMenuButton1">
                <li><button  onClick={() => handleFilterSelection()} >All</button></li>
                {
                    filter.options.map(option => {
                        return <li key={option}><button onClick={() => handleFilterSelection(filter.value, option)}>{option}</button></li>
                    })
                
                }
            </ul>
        </div>
    )
}

export default SelectFilter
