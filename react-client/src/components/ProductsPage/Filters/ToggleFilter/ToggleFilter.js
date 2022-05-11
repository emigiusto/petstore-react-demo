import React, { useState, useEffect } from 'react'
import './ToggleFilter.css'; 

function ToggleFilter(props) {
    const [active, setActive] = useState(false);

    useEffect(() => {
        if(props.activeFilters.length===0){
            setActive(false)
        }
    },[props.activeFilters]);

    const handleFilterToggle = (filter) =>{
        //getActive filter returns the filter or false if its not active
        setActive(!active)
        let activeState = props.getActiveFilter(filter) ? true : false
        props.updateActiveFilters(filter,!activeState)
    }

    return (
        <button type="button" 
                className={`m-2 col main__section__filters__item btn btn-${active ? "secondary" : "outline-secondary"}`}
                onClick={() => handleFilterToggle(props.filter.value)}>
            {props.filter.value}
        </button>
    )
}

export default ToggleFilter
