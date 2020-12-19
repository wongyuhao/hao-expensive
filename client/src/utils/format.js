

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
    marginRight: 8,
    height: 10,
    width: 10,
  },
});

export const getSymbol = (currency, enums) => {
  return (enums.currencies.filter(obj=>{return obj.code === currency })[0].symbol)
}

export const getCategoryColor = (category, enums) => {
  return (enums.categories.filter(obj => {return obj.name === category})[0].color)
}

export const dot = (color = '#ccc') => ({
  alignItems: 'center',
  display: 'flex',
  backgroundColor: color,
  borderRadius: 10,
  content: '" "',
  height: '0.7rem',
  width: '0.7rem',
  marginTop:'0.1rem',
  marginRight: '1rem'
});