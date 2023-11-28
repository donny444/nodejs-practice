import { useState } from 'react'
import './App.css'

function App() {
  const [category, setCategory] = useState("SHOP");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const apiUrl = `http://localhost:4000/?categorycodes=${category}`;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(apiUrl);
      if(!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseData = await response.json();
      setData(responseData);
    } catch(err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
          <select onChange={(e) => setCategory(e.target.value)}>
            <option value="SHOP" selected>Shop</option>
            <option value="RESTAURANT">Restaurant</option>
            <option value="ALL">All</option>
            <option value="OTHER">Other</option>
          </select>
          <input type="submit" value="Submit" />
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data &&
      <div>
        {data.result.map((place, index) => (
          <p key={index}>{place.place_name}</p>
        ))}
      </div>
      }
    </>
  )
}

export default App
