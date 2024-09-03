import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../CartContext";
import "./Cart.css";
import axios from "axios";

const Cart = () => {
  const {
    seeCart,
    resetCart,
    seeItems,
    incrementItemBy1,
    decrementItemBy1,
    removeItem,
    setCart,
  } = useContext(CartContext);

  const items = seeItems();
  const cart = seeCart();
  const [itemDetails, setItemDetails] = useState({});

  const printItems = () => {
    console.log(typeof items);
  };

  const getItemDetail = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/finditem/${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setItemDetails((prevDetails) => ({
        ...prevDetails,
        [id]: data,
      }));
    } catch (error) {
      console.log("response not ok");
    }
  };

  const handlePayClick = async (event) => {
    event.preventDefault();
    console.log("Form data:", cart);
    try {
      const response = await axios.post(
        "http://localhost:4000/sendorder",
        cart
      );
      console.log(response.data);
      window.open(response.data, "_blank").focus();
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  useEffect(() => {
    Object.keys(cart).forEach((id) => {
      if (!itemDetails[id]) {
        getItemDetail(id);
      }
    });
  }, [cart]);

  return (
    <>
      <div className="cart-container">
        {Object.keys(cart).length === 0 ? (
          <p>Your cart is empty</p>
        ) : (

          Object.entries(cart).map(([id, quantity]) => (
            <div className="item-container" key={id}>
              <img
                src={itemDetails[id]?.picture}
                className="picture"
                alt="pic"
              ></img>
              <div className="info-container">
                <p className="item-name">
                  {" "}
                  {itemDetails[id]?.name || "Loading..."}{" "}
                </p>
                <div className="quantitybuttons">
                  <button className="foo" onClick={() => incrementItemBy1(id)}>+</button>

                  <p className="item-quantity"> {quantity}</p>
                  <button className="foo" onClick={() => decrementItemBy1(id)}>-</button>
                  <button  onClick={() => removeItem(id)}> delete </button>
                </div>
              </div>
            </div>
          ))
        )}
        {Object.keys(cart).length === 0 ? (
          <></>
        ) : (
          <button onClick={handlePayClick}>pay</button>
        )}
      </div>

      <button onClick={seeCart}>asdf</button>
      <button onClick={resetCart}>Reset Cart</button>
    </>


  );
};

export default Cart;
