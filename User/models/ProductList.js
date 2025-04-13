class ProductList {
  constructor() {
    this.arr = [];
  }

  addProduct(product) {
    this.arr.push(product);
  }

  filterProduct(type) {
    if (type === "all") {
      return this.arr;
    }
    return this.arr.filter((product) => product.type === type);
  }
}
export default ProductList;
