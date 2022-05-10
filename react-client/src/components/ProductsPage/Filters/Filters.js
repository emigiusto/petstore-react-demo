import React from 'react'
import SelectFilter from './SelectFilter/SelectFilter'
import ToggleFilter from './ToggleFilter/ToggleFilter'
import {ProductConsumer} from '../../../context'

import './Filters.css'; 

export default function Filters() {
  return (
    <div className="m-2 px-0 main__section__filters__item filters-select dropdown">
      <ProductConsumer>
        {
            (contextState)=>{
              return contextState.filters.map(filter => {
                if (filter.type === "toggle") {
                  return <ToggleFilter 
                              key={filter.id} 
                              filter={filter} 
                              updateActiveFilters={contextState.updateActiveFilters}
                              getActiveFilter={contextState.getActiveFilter}>
                          </ToggleFilter>
                } else if  (filter.type === "select"){
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
        }
      </ProductConsumer> 
    </div>
  )
}
