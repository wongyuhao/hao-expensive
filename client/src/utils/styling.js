import chroma from 'chroma-js'
import {dotBefore} from './format'
const currGray = 'rgb(38,38,38)'
const getContrast = (color, compared) => (
  chroma.contrast(color, compared) > 2
          ? 'white'
          : 'black'
)

const colourStyles = {
  control: styles => ({ ...styles, backgroundColor: currGray, border:'none', width: "100%", }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      ...dotBefore(isSelected? getContrast(color, 'white') : data.color),
      backgroundColor: isDisabled
        ? null
        : isSelected
          ? data.color
          : isFocused
            ? color.alpha(0.1).css()
            : currGray,
      color: isDisabled
        ? '#ccc'
        : isSelected
          ? getContrast(color, 'white')
          : chroma.contrast(color, currGray) > 4.5
            ? data.color
            : color.brighten(0.6).css(),
      cursor: isDisabled ? 'not-allowed' : 'default',

      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
      },
    };
  },
  menu: provided => ({ ...provided,backgroundColor:currGray, zIndex: "9999 !important" }),
  placeholder: styles => ({ ...styles }),
  singleValue: (styles, { data }) => {
    const color = chroma(data.color);
    return ({
      ...styles, 
      maxWidth:'100%',
      color: chroma.contrast(color, currGray) > 4.5
              ? data.color
              : color.brighten(0.6).css(),
      "font-style":'italic'
   })
  }
};

const multiColorStyles ={
  ...colourStyles,
  multiValue: (styles, { data }) => {
    return {
      ...styles,
      backgroundColor: data.color
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: getContrast(data.color, 'white'),
  }),
  multiValueRemove: (styles, { data }) => {
    let btncolor = getContrast(data.color, 'white')
    
    return({
    ...styles,
    color: btncolor,
    ':hover': {
      backgroundColor: btncolor,
      color: getContrast(btncolor, 'white'),
    },
  })},
}

const groupStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};
const groupBadgeStyles = {
  backgroundColor: '#EBECF0',
  borderRadius: '2em',
  color: '#172B4D',
  display: 'inline-block',
  fontSize: 12,
  fontWeight: 'normal',
  lineHeight: '1',
  minWidth: 1,
  padding: '0.16666666666667em 0.5em',
  textAlign: 'center',
};

export  {colourStyles, multiColorStyles, groupBadgeStyles, groupStyles};