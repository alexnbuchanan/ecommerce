export default function totalPrice(storageItems){
  const totalPriceHolder = []
  storageItems.map((a, index) => {
    const totalPrice = a.price * a.quantity * 100;
    totalPriceHolder.push(totalPrice)
  })
   const totalPriceReduce = totalPriceHolder.reduce((a, b) => a + b, 0);
   const constupdatedTotalPriceReduce = parseFloat(totalPriceReduce) / 100
   return constupdatedTotalPriceReduce.toFixed(2)
}
