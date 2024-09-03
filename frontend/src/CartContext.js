import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext(null);

export const CartContextProvider = (props) => {
  // Initialize cartItems state with the data from localStorage, or an empty object if there's none

  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("/items")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
      });
  }, []);

  const seeItems = () => {
    return items;
  };

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : {};
  });

  // Save cartItems to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const seeCart = () => {
    return cartItems;
  };

  const resetCart = () => {
    console.log("resetting cart");
    setCartItems({});
  };

  const incrementCart = (id, quantity) => {
    if (id in cartItems) {
      setCartItems((prev) => ({ ...prev, [id]: prev[id] + quantity }));
    } else {
      setCartItems((prev) => ({ ...prev, [id]: quantity }));
    }
  };

  const setCart = (id, quantity) => {
    setCartItems((prev) => ({ ...prev, [id]: quantity }));
  
  };



  const incrementItemBy1 = (id) => {
    if (id in cartItems) {
      setCartItems((prev) => ({ ...prev, [id]: prev[id] + 1 }));
    }
  };

  const decrementItemBy1 = (id) => {
    if (id in cartItems){
      if (cartItems[id] > 1){
        setCartItems((prev) => ({ ...prev, [id]: prev[id] - 1 }));
      }
    }


  }

  const removeItem = (id) => {
    if (id in cartItems){
      const { [id]: _, ...rest } = cartItems;
      setCartItems(rest);
    }

  }



  const contextValue = {
    seeCart,
    incrementCart,
    resetCart,
    seeItems,
    incrementItemBy1,
    decrementItemBy1,
    removeItem,
    setCart
  };

  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  );
};
