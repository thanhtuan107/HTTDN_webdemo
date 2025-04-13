// class Product {
//   constructor(id, name, screen, backCamera, frontCamera, img, desc, type) {
//     this.id = id;
//     this.name = name;
//     this.screen = screen;
//     this.backCamera = backCamera;
//     this.frontCamera = frontCamera;
//     this.img = img;
//     this.desc = desc;
//     this.type = type;
//   }
// }

// export default Product;

class Wine {
  constructor(id, name, type, origin, volume, alcoholContent, price, image, description) {
      this.id = id;
      this.name = name;
      this.type = type;
      this.origin = origin;
      this.volume = volume;
      this.alcoholContent = alcoholContent;
      this.price = price;
      this.image = image;
      this.description = description;
  }
}

export default Wine;
