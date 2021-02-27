export default function getQuantity(products) {
  return products.reduce((count, { quantity }) => count + quantity, 0);
}
