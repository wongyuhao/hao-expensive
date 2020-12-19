

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
    color: '#ed1c24'
  },
  {
    name: "MAYBANK",
    currency: currencies[0],
    color: '#fecf07'
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
    color: '#3498db'
  },
  {
    name: 'Entertainment',
    color: '#ff009d'
  },
  {
    name: 'Planned',
    color: '#626567'
  },
  {
    name: 'Food',
    color: '#8e44ad'
  },
  {
    name: 'Education',
    color: '#0000FF'
  },
  {
    name: 'Groceries',
    color: '#2ecc71'
  },
  {
    name: 'Housing',
    color: '#c0392b'
  },
  {
    name: 'Misc',
    color: '#000'
  }
]

exports.enums = {
  currencies: currencies,
  sources : sources,
  categories: categories
  
}