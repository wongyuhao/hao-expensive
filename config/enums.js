

const currencies = [
  {
    code: "MYR",
    symbol: "RM"
  },
  {
    code: "USD",
    symbol: "$"
  }
]

const sources = [
  {
    name: "CIMB",
    currency: currencies[0],
    color: '#0000FF'
  },
  {
    name: "DEV_ONLY",
    currency: currencies[1]
  },
  {
    name: "MAYBANK",
    currency: currencies[0]
  },
  {
    name: "OTHER",
    currency: currencies[1]
  }
]

const categories = [
  {
    name: 'PETRONAS',
    color: '#38B09D'
  },
  {
    name: 'Tech',
    color: '#0000FF'
  },
  {
    name: 'Food',
    color: '#0000FF'
  },
  {
    name: 'Education',
    color: '#0000FF'
  },
  {
    name: 'Groceries',
    color: '#0000FF'
  },
  {
    name: 'Housing',
    color: '#0000FF'
  },
  {
    name: 'Misc',
    color: '#FFF'
  }
]

exports.enums = {
  currencies: currencies,
  sources : sources,
  categories: categories
  
}