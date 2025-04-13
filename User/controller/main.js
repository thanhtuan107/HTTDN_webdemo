import api from "./../services/api.js";
import renderListCart from "./../controller/main_cart.js";
import ProductList from "../models/ProductList.js";

export const getEleId = (id) => document.getElementById(id);

export let cartArr = [];

const productList = new ProductList();

const renderListProduct = (data) => {
  let content = "";
  data.forEach((product, i) => {
    const { name, origin, volume, alcoholContent, image, description, type, price } = product;

    content += `
          <div class="card__item hover:shadow-lg w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div>
              <div class="card__product w-3/4 lg:w-full">
                <img
                  class="p-8 rounded-t-lg cardProduct__img"
                  src="${image}"
                  alt="product image"
                />
              </div>
              <div class="px-5 pb-16">
                <div>
                  <p
                    class="text-3xl font-bold text-red-600 mb-5"
                  >$${price}</p>
                </div>
                <a href="#">
                  <h5
                    class="text-3xl lg:text-xl font-semibold tracking-tight text-gray-900"
                  >
                  ${name}
                  </h5>
                </a>
                <div class="cardProduct__text">
                  <p class="py-2 text-gray-500">
                  <i class="fa-solid fa-globe"></i>
                  Origin: ${origin}
                  </p>
                  <p class="py-2 text-gray-500">
                  <i class="fa-solid fa-wine-bottle"></i>
                  Volume: ${volume}ml
                  </p>
                  <p class="py-2 text-gray-500">
                  <i class="fa-solid fa-percent"></i>
                  Alcohol Content: ${alcoholContent}%
                  </p>
                  <p class="py-2 text-gray-500">
                  <i class="fa-solid fa-tag"></i>
                  Type: ${type}
                  </p>
                  <p class="py-2 text-gray-500">
                  <i class="fa-solid fa-clipboard"></i>
                  ${description}
                  </p>
                  <Button
                    class="absolute bottom-5 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    onclick="addToCart(${product.id})">Add to cart</Button>
                </div>
              </div>
            </div>
          </div>
    `;
  });
  getEleId("mainProduct").innerHTML = content;
};

const getListProduct = (type = "all") => {
  const promise = type === "all" ? api.fetchData() : api.fetchProductsByType(type);
  promise
    .then((result) => {
      renderListProduct(result.data);
      productList.arr = result.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

getListProduct();

// Lưu giỏ hàng vào localStorage
export function saveCart(cart) {
  localStorage.setItem("CART__LIST", JSON.stringify(cart));
}

// Popup notification
const showPopup = (message) => {
  const popup = document.createElement("div");
  popup.className = "popup-notification";
  popup.innerText = message;
  document.body.appendChild(popup);

  setTimeout(() => {
    popup.remove();
  }, 1000);
};

/**
 * Add to cart
 */
const addToCart = (id) => {
  const promise = api.getDataById(id);
  promise
    .then((result) => {
      const { data } = result;
      const existingProduct = cartArr.find((product) => product.id === data.id);
      if (existingProduct) {
        existingProduct.quality += 1;
      } else {
        data.quality = 1;
        cartArr.push(data);
      }

      // Lưu giỏ hàng vào localStorage
      saveCart(cartArr);

      renderListCart();

      // Show popup notification
      showPopup("Sản phẩm đã được thêm vào giỏ hàng!");
    })
    .catch((error) => {
      console.log(error);
    });
};
window.addToCart = addToCart;

const showCart = () => {
  getEleId("cart").style.display = "block";
};
window.showCart = showCart;

const closeCart = () => {
  getEleId("cart").style.display = "none";
};
window.closeCart = closeCart;

/**
 * Filter Product
 */
getEleId("selLoai").addEventListener("change", function () {
  const type = getEleId("selLoai").value;
  getListProduct(type);
});
