import React from 'react';
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

export default (props) => (
  <Select
    isMulti
    components={animatedComponents}
    className='w-full pt-3 lg:pt-1 lg:ml-10'
    styles={multiColorStyles}
    options={props.options}
    formatGroupLabel={formatGroupLabel}
  />
);
