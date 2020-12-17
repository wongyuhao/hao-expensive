

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

export function arrayToOptions(arr){
  return (
    arr.map(option => {
      let obj = {};
      obj['value'] = option.toUpperCase();
      obj['label'] = option.toUpperCase();

      return obj
    })
  )
}