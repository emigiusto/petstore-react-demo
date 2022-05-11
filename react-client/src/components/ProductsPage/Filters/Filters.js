import React, { useEffect } from 'react'
import SelectFilter from './SelectFilter/SelectFilter'
import ToggleFilter from './ToggleFilter/ToggleFilter'
import './Filters.css';

export default function Filters({ contextState }) {

  useEffect(() => {
    contextState.clearActiveFilters();
  },[]);

  return (
    <div className="m-2 px-0 main__section__filters__item filters-select dropdown">
      {
        contextState.filters.map(filter => {
          if (filter.type === "toggle") {
            return <ToggleFilter
              key={filter.id}
              filter={filter}
              updateActiveFilters={contextState.updateActiveFilters}
              getActiveFilter={contextState.getActiveFilter}>
            </ToggleFilter>
          } else if (filter.type === "select") {
            return <SelectFilter
              key={filter.id}
              filter={filter}
              updateActiveFilters={contextState.updateActiveFilters}>
            </SelectFilter>
          } else {
            return <div ></div>
          } 
        })
      }
      <button onClick={()=> contextState.clearActiveFilters()}>Clear Filters</button>
    </div>
  )
}
