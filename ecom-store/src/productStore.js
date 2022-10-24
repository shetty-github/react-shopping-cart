// coffee: price_1LwG2eLIT8vyepKr2AC4hcyj
// sunglasses: price_1LwG3VLIT8vyepKrYeAWHuWE
// camera: price_1LwG4ALIT8vyepKrFGS8xOgs
export const productsArray = [
  {
    id: "price_1LwG2eLIT8vyepKr2AC4hcyj",
    title: "Coffee",
    price: 4.99
  },
  {
    id: "price_1LwG3VLIT8vyepKrYeAWHuWE",
    title: "Sunglasses",
    price: 9.99
  },
  {
    id: "price_1LwG4ALIT8vyepKrFGS8xOgs",
    title: "Camera",
    price: 39.99
  }
];

export const getProductData = (id) => {
  let productData = productsArray.find((product) => product.id === id);

  if (productData) return productData;

  console.log("Product data does not exist for ID: " + id);
};
