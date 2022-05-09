import React from 'react'
import SelectFilter from './SelectFilter'
import ToggleFilter from './ToggleFilter'
import {ProductConsumer} from '../../../context'

export default function Filters() {
  return (
    <div className="m-2 px-0 main__section__filters__item filters-select dropdown">
      <ProductConsumer>
        {
            (contextState)=>{
              return contextState.filters.map(filter => {
                if (filter.type === "toggle") {
                  return <ToggleFilter key={filter.id} filter={filter}></ToggleFilter>
                } else if  (filter.type === "select"){
                  return <SelectFilter key={filter.id} filter={filter}></SelectFilter>
                } else {
                  return <div></div>
                }
              })
            }
        }
      </ProductConsumer> 
    </div>
  )
}
