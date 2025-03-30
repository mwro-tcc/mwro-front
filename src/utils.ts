export const priceFormatter = (price: number) => {
  const priceInCents = price / 100
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(priceInCents)
}
