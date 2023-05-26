const MONTHS = [
    '',
    'janeiro',
    'fevereiro',
    'março',
    'abril',
    'maio',
    'junho',
    'julho',
    'agosto',
    'setembro',
    'outubro',
    'novembro',
    'dezembro',
  ]
  
  const moneyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
  
  function getPercent(current: any, previous: any) {
    return (current / previous - 1) * 100
  }
  
  function formatMoney(value: any) {
    return moneyFormatter.format(value)
  }
  
  function formatPercent(value: any) {
    const symbol = value > 0 ? '+' : ''
    return symbol + value.toFixed(2).replace('.', ',') + '%'
  }
  
  function getMonth(monthNumber: any) {
    return MONTHS[monthNumber]
  }
  
  export { formatMoney, formatPercent, getMonth, getPercent }
  