import { useState, useEffect } from "react";
import "./App.css";
import Brew from "./components/Brew";
import {Link} from "react-router-dom";


function App() {
  const [brewery, setBrewery] = useState([]);
  const [totalNum, setTotalNum] = useState(0);
  const [totalCities, setTotalCities] = useState({});
  const [totalTypes, setTotalTypes] = useState({});
  const [inputFilter, setInputFilter] = useState({
    size: "",
    zip: "",
  });


  const fetchAPI = async (size = "", zip = "") => {
    const json = await (
      await fetch(
        `https://api.openbrewerydb.org/v1/breweries?${
          zip != "" ? "&by_postal=" + zip : ""
        }${size != "" ? "&by_type=" + size : ""}`
      )
    ).json();
    setBrewery(json);
    setTotalNum(json.length);
    json.map((brew) => {
      setTotalCities((prev) => {
        return { ...prev, [brew.city]: true };
      });
      setTotalTypes((prev) => {
        return { ...prev, [brew.brewery_type]: true };
      });
    });
  };

  const handleInputChange = (e) => {
    setInputFilter((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = () => {
    setTotalCities({});
    setTotalTypes({});
    fetchAPI(inputFilter.size, inputFilter.zip);
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <div className="App">
      <h1>Let's Explore our brewry!</h1>

      <div className="Filter">


        <label for="zip">Zip Code: </label>
        <input
          id="zip"
          name="zip"
          type="text"
          pattern="[0-9][0-9][0-9][0-9][0-9]"
          placeholder="Enter zip code"
          value={inputFilter.zip}
          onChange={handleInputChange}
        />
        <button onClick={handleSubmit}>Search</button>
      </div>

      {brewery.map((brew) => {
        return (
          <Link
            key={brew.id}
            to={`/detail/${brew.id}`}
            state={{
              id: brew.id,
              name: brew.name,
              address: `${brew.street}, ${brew.city}, ${brew.state} ${brew.postal_code}`,
              longitude: brew.longitude,
              latitude: brew.latitude,
              type: brew.brewery_type,
              website: brew.website_url,
              phone: brew.phone,
            }}
          >
          <Brew
            key={brew.id}
            name={brew.name}
            street={brew.street}
            city={brew.city}
            state={brew.state}
            postal={brew.postal_code.slice(0, 5)}
            website={brew.website_url}
            phone={brew.phone}
            type={brew.brewery_type}
          />
          </Link>
        );
      })}
    </div>
  );
}

export default App;