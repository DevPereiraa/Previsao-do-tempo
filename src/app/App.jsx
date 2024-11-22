import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import './App.css'

import api from "./api/api";
import config from "./config";

function App() {
  const [input, setInput] = useState('');
  const [city, setCity] = useState({});
  

const apiKey = config.apiKey;


  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  async function SearchClick() {
    if (input === '') {
      alert('Digite o nome da cidade');
      return;
    }

    try {
      const response = await api.get(`/weather?q=${input}&appid=${apiKey}&units=metric&lang=pt`);
      setCity(response.data); 
      setInput(''); 
    } catch {
      alert('Cidade não encontrada');
      setInput('');
    }
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      SearchClick();
    }
  }

  return (
    <>
      <div className='mainContainer'>
      <h1>Previsão do Tempo</h1>
        <div className="secundaryContainer">
          <div className="searchContainer">

            <input type="text"
            placeholder='Digite o nome da cidade'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e)}
            />

            <button onClick={SearchClick}>
              <FiSearch size={25} color="#FFF"/>
            </button>
          </div>


          {Object.keys(city).length > 0 && (
            <main>
            <div className="city">
              <h2>Tempo em {city.name}</h2>
              <p>Temperatura: {city.main.temp}°C</p>
              <p>
                <span>
                  <img
                    style={{ width: '50px', height: '50px', marginRight: '12px' }}
                    src={`http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
                    alt={city.weather[0].description}
                  />
                </span>
                {capitalizeFirstLetter(city.weather[0].description)}
              </p>
              <p>Umidade: {city.main.humidity}%</p>
            </div>
          </main>
          )}
          
        </div>
      </div>
    </>
  )
}


export default App
