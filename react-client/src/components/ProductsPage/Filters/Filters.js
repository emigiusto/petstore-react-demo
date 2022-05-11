import React from 'react'
import SelectFilter from './SelectFilter/SelectFilter'
import ToggleFilter from './ToggleFilter/ToggleFilter'
import './Filters.css';

export default function Filters({ contextState }) {

  const handleClearFilters = () =>{
    contextState.clearActiveFilters()
  }

  return (
    <div className="main__section__filters row d-flex flex-row align-items-center my-3">
      {
        contextState.filters.map(filter => {
          if (filter.type === "toggle") {
            return <ToggleFilter
              key={filter.id}
              filter={filter}
              updateActiveFilters={contextState.updateActiveFilters}
              getActiveFilter={contextState.getActiveFilter}
              activeFilters={contextState.activeFilters}>
            </ToggleFilter>
          } else if (filter.type === "select") {
            return <SelectFilter
              key={filter.id}
              filter={filter}
              updateActiveFilters={contextState.updateActiveFilters}
              activeFilters={contextState.activeFilters}>
            </SelectFilter>
          } else {
            return <div ></div>
          } 
        })
      }
      <button type="button" className="m-2 col px-0 btn btn-dark"  onClick={()=> handleClearFilters()}>Clear Filters</button>
    </div>
  )
}
