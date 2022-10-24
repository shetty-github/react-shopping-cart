import { createContext, useState } from "react";
import { productsArray, getProductData } from "./productStore";

export const CartContext = createContext({
  items: [],
  getProductQuantity: () => {},
  addOneToCart: () => {},
  removeOneFromCart: () => {},
  deleteFromCart: () => {},
  getTotalCost: () => {}
});

export const CartProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([]);

  // [ { id: 1, quantity: 2} ]
  const getProductQuantity = (id) => {
    const quantity = cartProducts.find(
      (product) => product.id === id
    )?.quantity;

    if (quantity) return quantity;

    return 0;
  };

  const addOneToCart = (id) => {
    const quantity = getProductQuantity(id);

    if (quantity)
      return setCartProducts(
        cartProducts.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        )
      );

    setCartProducts([...cartProducts, { id: id, quantity: 1 }]);
  };

  const deleteFromCart = (id) => {
    // [ ] if an object meets a condition, add the object to array
    setCartProducts((cartProducts) =>
      cartProducts.filter((currentProduct) => currentProduct.id !== id)
    );
  };

  const removeOneFromCart = (id) => {
    const quantity = getProductQuantity(id);

    if (quantity === 1) return deleteFromCart(id);

    setCartProducts(
      cartProducts.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  const getTotalCost = () => {
    let totalCost = 0;
    cartProducts.map((cartItem) => {
      const productData = getProductData(cartItem.id);
      totalCost += productData.price * cartItem.quantity;
    });

    return totalCost;
  };

  const contextValue = {
    items: cartProducts,
    getProductQuantity,
    addOneToCart,
    removeOneFromCart,
    deleteFromCart,
    getTotalCost
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export default CartProvider;

// Context (cart, addToCart, removeCart)
// Provider -> gives your React app access to all the things in your context
