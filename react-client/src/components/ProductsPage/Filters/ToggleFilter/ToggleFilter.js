import React from 'react'
import './ToggleFilter.css'; 

function ToggleFilter(props) {

    const handleFilterToggle = (filter) =>{
        //getActive filter returns the filter or false if its not active
        let activeState = props.getActiveFilter(filter) ? true : false
        props.updateActiveFilters(filter,!activeState)
    }

    return (
        <button type="button" 
                className="m-2 main__section__filters__item  btn btn-outline-secondary" 
                onClick={() => handleFilterToggle(props.filter.value)}>
            {props.filter.value}
        </button>
    )
}

export default ToggleFilter
