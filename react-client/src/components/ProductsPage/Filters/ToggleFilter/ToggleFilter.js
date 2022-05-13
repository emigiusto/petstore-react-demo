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
                className={`m-2 col-md-3 col-sm-6 col-lg-2 filters__filter btn btn-${active ? "secondary" : "outline-secondary"}`}
                onClick={() => handleFilterToggle(props.filter.value)}>
            {props.filter.value.charAt(0).toUpperCase() + props.filter.value.slice(1)}
        </button>
    )
}

export default ToggleFilter
