

const currencies = [
  {
    code: "USD",
    symbol: "$"
  }
]

const sources = [
  {
    name: "BANK OF AMERICA",
    currency: currencies[0],
    color: '#0065B3'
  },
  {
    name: "OTHER",
    currency: currencies[0],
    color: '#ccc'
  }
]

const categories = [
  {
    name: 'Home & Utilities',
    color: '#6DC24B'
  },
  {
    name: 'Transportation',
    color: '#00AD51'
  },
  {
    name: 'Groceries',
    color: '#00924D'
  },
  {
    name: 'Personal & Family Care',
    color: '#007749'
  },
  {
    name: 'Health',
    color: '#164734'
  },
  {
    name: 'Insurance',
    color: '#004990'
  },
  {
    name: 'Restaurants & Dining',
    color: '#FFCC00'
  },
  {
    name: 'Shopping & Entertainment',
    color: '#E7A614'
  },
  {
    name: 'Travel',
    color: '#EA7600'
  },
  {
    name: 'Cash, Checks & Misc',
    color: '#B94700'
  },
  {
    name: 'Giving',
    color: '#AA0061'
  },
  {
    name: 'Business Expenses',
    color: '#840C56'
  },
  {
    name: 'Education',
    color: '#673BB7'
  },
  {
    name: 'Finance',
    color: '#4A116F'
  }
  
]

exports.defaultEnums = {
  currencies: currencies,
  sources : sources,
  categories: categories
}