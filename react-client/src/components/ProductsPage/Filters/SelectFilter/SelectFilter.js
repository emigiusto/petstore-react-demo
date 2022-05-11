import React, { useState, useEffect } from 'react'
import './SelectFilter.css'; 

function SelectFilter(props) {

    const [trigger, setTrigger] = useState(false);

    useEffect(() => {
        if(props.activeFilters.length===0){
            setTrigger(false)
            var dropDown = document.getElementById(`select-${props.filter.value}`);
            dropDown.selectedIndex = 0;
        }
    },[props.activeFilters,props.filter.value]);

    const handleChange = (e) => {
        props.updateActiveFilters(props.filter.value,e.target.value)
    }

    return (
            <select id={`select-${props.filter.value}`} className="col-md-3 col-sm-6 col-lg-2 m-2 filters__filter main__section__filters__item__select" activite={trigger.toString()} onChange={(e) => handleChange(e)}>
                <option className="main__section__filters__item__select__option" value="" defaultValue hidden>{props.filter.value}</option>
                <option className="main__section__filters__item__select__option" value="All" >All</option>
                {
                    props.filter.options.map(option => {
                        return <option className="main__section__filters__item__select__option" key={option} value={option}>{option}</option>
                    })
                }
            </select>
    )
}

export default SelectFilter