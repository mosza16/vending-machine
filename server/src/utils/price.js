export const calculateProductsPrice = (products) => {
  if (products.length < 1) return 0;
  return products.reduce((sum, product) => {
    sum += product.price * product.quantity;
    return sum;
  }, 0);
};
