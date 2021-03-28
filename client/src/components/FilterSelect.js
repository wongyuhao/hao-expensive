import React, {useState, useContext} from 'react';
import {GlobalContext} from '../context/GlobalState'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {multiColorStyles, groupBadgeStyles, groupStyles} from '../utils/styling'
import { set } from 'mongoose';


const formatGroupLabel = data => (
  <div style={groupStyles}>
    <span>{data.label}</span>
    <span style={groupBadgeStyles}>{data.options.length}</span>
  </div>
);


const animatedComponents = makeAnimated();



export default (props) => {
  return (
    <>
    <Select
    isMulti
    components={animatedComponents}
    className='w-full pt-3 lg:pt-1 lg:ml-10'
    placeholder={"Source..."}
    styles={multiColorStyles}
    options={props.sources}
    formatGroupLabel={formatGroupLabel}
    value={props.selectedSources}
    onChange={props.handleSourceChange}
  />
  <Select
    isMulti
    components={animatedComponents}
    className='w-full pt-3 lg:pt-1 lg:ml-2'
    placeholder={"Category..."}
    styles={multiColorStyles}
    options={props.categories}
    formatGroupLabel={formatGroupLabel}
    value={props.selectedCategories}
    onChange={e => props.handleCategoryChange(e)}
  />
  <Select
    className='w-64 pt-3 lg:pt-1 lg:ml-2'
    placeholder={"Count"}
    styles={multiColorStyles}
    value={{
      "value" : props.perpage,
      "label": props.perpage,
      "color" : "#ccc"
    }}
    onChange={e=>props.setPerpage(e.value)}
    options={[{
      label:'Count',
      options: [
        {
          "value" : 10,
          "label": 10,
          "color" : "#ccc"
        },
        {
          "value" : 25,
          "label": 25,
          "color" : "#ccc"
        },
        {
          "value" : 50,
          "label": 50,
          "color" : "#ccc"
        }
      ]
    }]}
  />
  
  </>
)
};
