
import chroma from 'chroma-js';

export function numberWithCommas(x) {
  return x.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

 export const dotBefore = (color = '#ccc') => ({
  alignItems: 'center',
  display: 'flex',

  ':before': {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: 'block',
    height: '0.7rem',
    width: '0.7rem',
    marginTop:'0.1rem',
    marginRight: '0.6rem',
    
  },
});

export const getSymbol = (currency, enums) => {
  let obj = enums.currencies.find(obj=>{return obj.code === currency })
  return (obj && obj.symbol) ? obj.symbol : "$"
}

export const getCategoryColor = (category, enums) => {
  let obj = enums.categories.find(obj => {return obj.name === category})
  return (obj && obj.color) ? obj.color : '#ccc'
}

export const getSourceColor = (source, enums)=> {
  let obj = enums.sources.find(obj => obj.name ===source)
  return (obj && obj.color) ? obj.color : "#ccc"
}

export const dot = (color = '#ccc') => {

  if(chroma.deltaE(color, 'black') < 1){
    color = chroma('white')
  }

return({
  alignItems: 'center',
  display: 'flex',
  backgroundColor: color,
  borderRadius: 10,
  content: '" "',
  height: '0.7rem',
  width: '0.7rem',
  minHeight: '0.7rem',
  minWidth: '0.7rem',
  marginTop:'0.1rem',
  marginRight: '1rem'
});}

