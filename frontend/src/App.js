import React, {useState, useEffect} from 'react'

function App() {
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch("/items").then(
      res => res.json()
    ).then(
      data => {
        setItems(data)
      }
    )
  }, [])


  return (
    <div>
      {items.length === 0 ? (
        <>
        <p> loading... </p>
        </>
      ) : (
        items.map((item)=> (
          <div key={item.id}> 
          <h2>{item.name}</h2>
          <p>{item.description}</p>
          </div>
        ))
      )
    }
    </div>
  )
}

export default App