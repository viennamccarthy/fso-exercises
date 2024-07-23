import { useState, useEffect } from 'react';
import axios from 'axios';

const Search = ({ searchInput, handleSearchInput }) => {
  return (
    <div>
      <p>Find countries: <input value={searchInput} onChange={handleSearchInput} /></p>
    </div>
  );
};

const Results = ({ allCountries, searchInput }) => {
  const filtered = allCountries
    .filter(country => country.toLowerCase().startsWith(searchInput.toLowerCase()));

  if (filtered.length === 1) {
    return <Country name={filtered[0].toLowerCase()} />
  } else if (searchInput.length !== 0 && filtered.length !== 0) {
    if (filtered.length > 10) { 
      return <p>Too many countries, provide narrower search</p>;
    } else {
      return (
        <ul>
          {filtered.map(country => <li key={country.replace(' ', '-')}>{country}</li>)}
        </ul>
      )
    }
  }
};

const Country = ({ name }) => {
  const [country, setCountry] = useState('');

  useEffect(() => {
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
      .then(response => {
        setCountry(response.data)
        console.log('inside useEffect', country.name.common);
      });
    }, []);
  if (country) {
    console.log(country.name.common);
  }

    return (
      <h1></h1>
    )
};

const App = () => {

  const [allCountries, setAllCountries] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setAllCountries(response.data
          .map(country => country.name.common)
        );
      });
  }, []);

  return (
    <div>
      <Search
        searchInput={searchInput}
        handleSearchInput={event => setSearchInput(event.target.value)}
      />
      <Results 
        allCountries={allCountries} 
        searchInput={searchInput}
      />
    </div>
  )
}

export default App;
