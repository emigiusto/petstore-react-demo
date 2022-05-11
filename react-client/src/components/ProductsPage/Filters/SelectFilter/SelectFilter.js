import React from 'react'
import './SelectFilter.css'; 

function SelectFilter(props) {

    const handleFilterSelection = (filter,option) =>{
        props.updateActiveFilters(filter,option)
    }

    return (
        <div className="m-2 col px-0 main__section__filters__item filters-select dropdown">
            <button>{props.filter.value}</button>
            <ul aria-labelledby="dropdownMenuButton1">
                <li><button onClick={() => handleFilterSelection(props.filter.value, "All")} >All</button></li>
                {
                    props.filter.options.map(option => {
                        return <li key={option}><button onClick={() => handleFilterSelection(props.filter.value, option)}>{option}</button></li>
                    })
                }
            </ul>
        </div>
    )
}

export default SelectFilter