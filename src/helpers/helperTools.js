/// export const save = () => {  }
/// export const get = () => {  }

export const getQuantity = (products) => {
  return products.reduce((count, { quantity }) => count + quantity, 0);
};

export const getTotal = (storageItems) => {
  const totalPriceHolder = []
  storageItems.map((a, index) => {
    const totalPrice = a.price * a.quantity * 100;
    totalPriceHolder.push(totalPrice)
  })
   const totalPriceReduce = totalPriceHolder.reduce((a, b) => a + b, 0);
   const constupdatedTotalPriceReduce = parseFloat(totalPriceReduce) / 100
   return constupdatedTotalPriceReduce.toFixed(2)
};

export const saveProducts = (products) => {
    localStorage.setItem('product', JSON.stringify(products));
};
