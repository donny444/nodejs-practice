import { useState } from 'react'
import './App.css'

function App() {
  const [category, setCategory] = useState(null);
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
            <option value="SHOP">Shop</option>
            <option value="RESTAURANT">Restaurant</option>
            <option value="ACCOMMODATION">Accommodation</option>
            <option value="ATTRACTION">Attraction</option>
          </select>
          <input type="submit" value="Submit" />
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data &&
      <div>
        {data.result.map((index) => (
          <p key={index}>{data.result[index].place_name}</p>
        ))}
      </div>
      }
    </>
  )
}

export default App
