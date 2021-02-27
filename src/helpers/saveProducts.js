export default function saveProducts(products) {
    localStorage.setItem('product', JSON.stringify(products));
}
