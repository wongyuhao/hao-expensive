

const currencies = [

  {
    code: "USD",
    symbol: "$"
  }
]

const sources = [
  {
    name: "Bank of America",
    currency: currencies[1],
    color: '#0065B3'
  },
  {
    name: "OTHER",
    currency: currencies[1],
    color: '#ccc'
  }
]

const categories = [

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
    color: '#fff'
  }
]

const enums = {
  currencies: currencies,
  sources : sources,
  categories: categories
  
}
export default enums;