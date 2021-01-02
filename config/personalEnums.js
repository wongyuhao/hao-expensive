const {defaultEnums} = require('./defaultEnums') 

const currencies = [
  ...defaultEnums.currencies,
  {
    code: "MYR",
    symbol: "RM"
  },
]

const sources = [
  {
    name: "CIMB",
    currency: currencies[1],
    color: '#ed1c24'
  },
  {
    name: "MAYBANK",
    currency:  currencies[1],
    color: '#fecf07'
  },
  ...defaultEnums.sources,
]

const categories = [
  {
    name: 'PETRONAS',
    color: '#38B09D'
  },
  ...defaultEnums.categories,
]

exports.personalEnums =  {
  currencies: currencies,
  sources: sources,
  categories: categories
}
