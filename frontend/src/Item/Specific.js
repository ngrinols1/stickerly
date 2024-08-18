
import React, { useState, useEffect } from 'react';


/*
Concept: render specific item based on where they clicked. Get sent the ID of the item here
then pull from DB that specific item and render here 

TODO:
add a call in backend for getting information for one specific item

implement being able to see what item was clicked on 

*/

const Specific = ({ id }) => {
  const [itemData, setItemData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try { 
        const response = await fetch(`http://localhost:4000/finditem/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setItemData(data);
      } catch (error) {
        console.log("response not ok")

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
    <div>
      <h1>Specific Item Details</h1>
      {itemData ? (
        <div>
          <p>ID: {itemData.id}</p>
          <p>Name: {itemData.name}</p>
          <p>Description: {itemData.description}</p>
          {/* Render more fields as necessary */}
        </div>
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
};

export default Specific;


