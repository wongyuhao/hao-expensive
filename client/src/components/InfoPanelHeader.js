import React, {useContext} from 'react'
import FilterSelect from './FilterSelect'
import {GlobalContext} from '../context/GlobalState'
export default () => {
  const {enums} = useContext(GlobalContext)

  return (
    <div className='flex flex-col lg:flex-row lg:justify-between p-3'>
        <h1 className='text-4xl  font-bold'>History</h1>
        <FilterSelect
          options = {[
            {
              label: 'Categories',
              options: enums.categories.map(obj =>
                ({
                  "value" : obj.name,
                  "label":obj.name,
                  "color" : obj.color || "#000"
                })
              )
            },
            {
              label: 'Sources',
              options: enums.sources.map(obj =>
                ({
                  "value" : obj.name.toUpperCase(),
                  "label": obj.name.toUpperCase(),
                  "color" : obj.color || "#000"
                })
              )
            }
          ]}
        />

      </div>
    
    
  )
}