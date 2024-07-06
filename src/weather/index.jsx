import React, { useEffect, useState } from 'react'
import Search from '../search';
export default function Weather() {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [weatherCondition, setWeatherCondition] = useState('');
  async function fetchWeatherData(param) {
    setLoading(true);
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=cb7413e1694b29f969d954a3e409329c`);
      /*in above adding query parameter which is search value*/

      const data = await response.json();
      if (data) { //once it is true set setLoading(false) and setWeatherData(data)
        setWeatherData(data);   //in console first getting true means in loading state later false  
        setLoading(false);
      }
      console.log(data, 'data');
    } catch (e) { //if something goes wrong will catch in catch block
      setLoading(false);
      console.log(e); //here
    }
  }
  async function handleSearch() {
    fetchWeatherData(search); // above param is nothing but search data
  }
  function getCurrentDate() {
    return new Date().toLocaleDateString('en-us', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }
  useEffect(() => //whenever load the data it needs to give the data based on the city
  {
    fetchWeatherData('bangalore'); //everytime it fetch the data based on bangalore city
  }, []);
  console.log(weatherData);  //data will show in console everytime getting data based on bangalore
  useEffect(() => {
    if (weatherData?.main?.temp) {
      const tempCelsius = weatherData.main.temp - 273.15;
      console.log(`Temperature: ${tempCelsius.toFixed(2)} °C`);
      if (tempCelsius > 30) {
        // Add sunny background class to body
      } else {
         // Remove sunny background class from body
      }
    }
  }, [weatherData]);
  return (
    <div>
      <Search
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      {
        loading ? ( //is data in loading it needs to show as loading 
          <div className='loading'>Loading...</div>
        ) : (
          <div>
            <div className='city-name'>
              <h2>
                {weatherData?.name},<span>{weatherData?.sys?.country}</span>  </h2>
              {/*  (in console it is there) sys : 
{type: 2, id: 2017753, country: 'IN', sunrise: 1719620791, */}
            </div>
            <div className='date'>
              <span>{getCurrentDate()}</span>
            </div>
            <div className='temp'>{(weatherData?.main?.temp - 273.15).toFixed(2)} °C</div>
            <div className='weather-condition'>
              {weatherCondition === 'sunny' ? (
                <p className='description'>{weatherData && weatherData.weather && weatherData.weather[0] ? weatherData.weather[0].description : ""}</p>
              ) : (
                <p className='rainy-weather'>{weatherData && weatherData.weather && weatherData.weather[0] ? weatherData.weather[0].description : ""}</p>
              )}
            </div>
             {/* <p className='description'>
              {weatherData && weatherData.weather && weatherData.weather[0] ? weatherData.weather[0].description : ""}
            </p> */}
            <div className='weather-info'>
              <div className='column'>
                <div>
                  <p className='wind'>{weatherData?.wind?.speed}</p>
                  <p>wind speed</p>
                </div>
              </div>
              <div >
                <div className='column'>
                  <p className='humidity'>{weatherData?.main?.humidity}%</p>
                  <p>Humidity</p>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}

/*'en-us' is a locale identifier that stands for "English (United States)". It specifies the language and regional settings used for formatting the date.
   Explanation of Locale Identifier
   en: Language code for English.
   us: Region code for the United States.
    */
