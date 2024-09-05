import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import "./ItemDetail.css"
import { CartContext } from "../CartContext";

const ItemDetail = () => {
  const {incrementCart, seeCart} = useContext(CartContext)
  

  const { id } = useParams();
  const [itemData, setItemData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };
  const handleQuantityChange = (event) => {
    const value = event.target.value;
    if (value === "" || /^[1-9]\d*$/.test(value)) { // Allow only positive integers
      setQuantity(value === "" ? "" : Number(value));
    }
  };


  const addToCart = (event) => {
    incrementCart(itemData.id, quantity)
    
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/finditem/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setItemData(data);
      } catch (error) {
        console.log("response not ok");

        setError(error.message);
      }
      setLoading(false);
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container">
      <h1>{itemData.name}</h1>
      {itemData ? (
        <div>
          <img src={itemData.picture} className="picture" alt={itemData.name}></img>
          <p>Name: {itemData.name}</p>
          <p> ${itemData.price}</p>

          <p> {itemData.description}</p>
          <p>Material: printed on vinyl sticker paper, laminated, glossy finish and water resistant.</p>

          <div>
            <button onClick={handleDecrement}>-</button>

             <input 
              type="text" 
              value={quantity} 
              onChange={handleQuantityChange} 
              className="quantity-input"
            />
            
            <button onClick={handleIncrement}>+</button>
          </div>
          
          <button onClick={addToCart}>add to cart</button>


        </div>
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
};

export default ItemDetail;
