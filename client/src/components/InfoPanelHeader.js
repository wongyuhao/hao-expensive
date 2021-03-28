import React, {useContext} from 'react'
import FilterSelect from './FilterSelect'
import {GlobalContext} from '../context/GlobalState'
export default (props) => {
  const {enums} = useContext(GlobalContext)
  return (enums) ? (
    <div className='flex flex-col lg:flex-row lg:justify-between p-3'>
        <h1 className='text-4xl  font-bold'>History</h1>
        <FilterSelect
        perpage={props.perpage}
        setPerpage = {props.setPerpage}
        selectedCategories = {props.selectedCategories}
        selectedSources = {props.selectedSources}
        handleCategoryChange = {props.handleCategoryChange}
        handleSourceChange = {props.handleSourceChange}

        className='z-50'
          categories = {[
            {
              label: 'Categories',
              options: enums.categories.map(obj =>
                ({
                  "value" : obj.name,
                  "label":obj.name,
                  "color" : obj.color || "#000"
                })
              )
            }
          ]}
          sources={[
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

  :

  <></>
}