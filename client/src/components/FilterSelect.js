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
  const [selected, setSelected] = useState([]);
  const handleSelectChange = (args) => {
    if(args){
      setSelected(args)
      getTransactions(args.map(i => i.value))
    } else{
      setSelected([])
      getTransactions();
    }
    
  }
  return (
  <Select
    isMulti
    components={animatedComponents}
    className='w-full pt-3 lg:pt-1 lg:ml-10'
    placeholder={"Filter..."}
    styles={multiColorStyles}
    options={props.options}
    formatGroupLabel={formatGroupLabel}
    value={selected}
    onChange={handleSelectChange}
  />
)
};
