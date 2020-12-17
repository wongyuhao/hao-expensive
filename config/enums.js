

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

exports.enums = {
  currencies: currencies,
  sources : [
    {
      name: "CIMB",
      currency: currencies[0]
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
  ],
  
  
}