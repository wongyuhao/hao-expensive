import React, {useState, useContext} from 'react';
import {GlobalContext} from '../context/GlobalState'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {multiColorStyles, groupBadgeStyles, groupStyles} from '../utils/styling'


const formatGroupLabel = data => (
  <div style={groupStyles}>
    <span>{data.label}</span>
    <span style={groupBadgeStyles}>{data.options.length}</span>
  </div>
);


const animatedComponents = makeAnimated();



export default (props) => {
  const {getTransactions} = useContext(GlobalContext)
  const [categories, setCategories] = useState([]);
  const [sources, setSources] = useState([]);
  const handleCategoryChange = (categories) => {
    setCategories(categories || [])
    getTransactions(sources.map(i=>i.value), categories?.map(i=>i.value) || [])
  }

  const handleSourceChange = (sources) => {
    setSources(sources || [])
    getTransactions(sources?.map(i=>i.value) || [], categories.map(i=>i.value))
  }

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
    value={sources}
    onChange={handleSourceChange}
  />
  <Select
    isMulti
    components={animatedComponents}
    className='w-full pt-3 lg:pt-1 lg:ml-10'
    placeholder={"Category..."}
    styles={multiColorStyles}
    options={props.categories}
    formatGroupLabel={formatGroupLabel}
    value={categories}
    onChange={handleCategoryChange}
  />
  
  </>
)
};
