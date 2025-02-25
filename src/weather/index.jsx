// import React, { useEffect, useState } from 'react'
// import Search from '../search';
// export default function Weather() {
//   const [search, setSearch] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [weatherData, setWeatherData] = useState(null);
//   const [weatherCondition, setWeatherCondition] = useState('');
//   async function fetchWeatherData(param) {
//     setLoading(true);
//     try {
//       const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=cb7413e1694b29f969d954a3e409329c`);
//       /*in above adding query parameter which is search value*/

//       const data = await response.json();
//       if (data) { //once it is true set setLoading(false) and setWeatherData(data)
//         setWeatherData(data);   //in console first getting true means in loading state later false  
//         setLoading(false);
//       }
//       console.log(data, 'data');
//     } catch (e) { //if something goes wrong will catch in catch block
//       setLoading(false);
//       console.log(e); //here
//     }
//   }
//   async function handleSearch() {
//     fetchWeatherData(search); // above param is nothing but search data
//   }
//   function getCurrentDate() {
//     return new Date().toLocaleDateString('en-us', {
//       weekday: 'long',
//       month: 'long',
//       day: 'numeric',
//       year: 'numeric'
//     })
//   }
//   useEffect(() => //whenever load the data it needs to give the data based on the city
//   {
//     fetchWeatherData('bangalore'); //everytime it fetch the data based on bangalore city
//   }, []);
//   console.log(weatherData);  //data will show in console everytime getting data based on bangalore
//   useEffect(() => {
//     if (weatherData?.main?.temp) {
//       const tempCelsius = weatherData.main.temp - 273.15;
//       console.log(`Temperature: ${tempCelsius.toFixed(2)} °C`);
//       if (tempCelsius > 30) {
//         // Add sunny background class to body
//       } else {
//          // Remove sunny background class from body
//       }
//     }
//   }, [weatherData]);
//   const getBackgroundClass = () => {
//     if (!weatherData || !weatherData.weather || !weatherData.weather[0]) return '';
//     switch (weatherData.weather[0].description) {
//       case 'light rain':
//         return 'light-rain';
//       case 'few clouds':
//         return 'few-clouds';
//       case 'scattered clouds':
//         return 'scattered-clouds';
//       case 'broken clouds':
//         return 'broken-clouds';
//       case 'shower rain':
//         return 'shower-rain';
//       case 'clear sky':
//         return 'clear sky';
//       case 'thunderstorm':
//         return 'thunderstorm';
//       case 'snow':
//         return 'snow';
//       case 'mist':
//         return 'mist';
//       default:
//         return '';
//     }
//   };

//   return (
//     <div>
//       <Search
//         search={search}
//         setSearch={setSearch}
//         handleSearch={handleSearch}
//       />
//       {
//         loading ? ( //is data in loading it needs to show as loading 
//           <div className='loading'>Loading...</div>
//         ) : (
//           <div>
//             <div className='city-name'>
//               <h2>
//                 {weatherData?.name},<span>{weatherData?.sys?.country}</span>  </h2>
//               {/*  (in console it is there) sys : 
// {type: 2, id: 2017753, country: 'IN', sunrise: 1719620791, */}
//             </div>
//             <div className='date'>
//               <span>{getCurrentDate()}</span>
//             </div>
//             <div className='temp'>{(weatherData?.main?.temp - 273.15).toFixed(2)} °C</div>
//             <div className='weather-condition'>
//               {weatherData && weatherData.weather && weatherData.weather[0] ? weatherData.weather[0].description : ""}
//             </div>
//              {/* <p className='description'>
//               {weatherData && weatherData.weather && weatherData.weather[0] ? weatherData.weather[0].description : ""}
//             </p> */}
//             <div className='weather-info'>
//               <div className='column'>
//                 <div>
//                   <p className='wind'>{weatherData?.wind?.speed}</p>
//                   <p>wind speed</p>
//                 </div>
//               </div>
//               <div >
//                 <div className='column'>
//                   <p className='humidity'>{weatherData?.main?.humidity}%</p>
//                   <p>Humidity</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//     </div>
//   );
// }

/*'en-us' is a locale identifier that stands for "English (United States)". It specifies the language and regional settings used for formatting the date.
   Explanation of Locale Identifier
   en: Language code for English.
   us: Region code for the United States.
    */
   import React, { useEffect, useState } from 'react';
import Search from '../search';

export default function Weather() {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  async function fetchWeatherData(param) {
    setLoading(true);
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=cb7413e1694b29f969d954a3e409329c`);
      const data = await response.json();
      if (data) {
        setWeatherData(data);
        setLoading(false);
      }
      console.log(data, 'data');
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  }

  async function handleSearch() {
    fetchWeatherData(search);
  }

  function getCurrentDate() {
    return new Date().toLocaleDateString('en-us', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }

  useEffect(() => {
    fetchWeatherData('bangalore');
  }, []);

  useEffect(() => {
    if (weatherData?.main?.temp) {
      const tempCelsius = weatherData.main.temp - 273.15;
      console.log(`Temperature: ${tempCelsius.toFixed(2)} °C`);
    }
  }, [weatherData]);

  const getBackgroundClass = () => {
    if (!weatherData || !weatherData.weather || !weatherData.weather[0]) return '';
    switch (weatherData.weather[0].description) {
      case 'light rain':
        return 'light-rain';
      case 'overcast clouds':
        return 'overcast-clouds';
      case 'scattered clouds':
        return 'scattered-clouds';
      case 'broken clouds':
        return 'broken-clouds';
      case 'shower rain':
        return 'shower-rain';
      case 'clear sky':
        return 'clear-sky';
      case 'thunderstorm':
        return 'thunderstorm';
      case 'haze':
        return 'haze';
      case 'mist':
        return 'mist';
      case 'heavy intensity rain':
        return 'heavy-intenity-rain';
      case 'few clouds':
        return 'few-clouds';
      case 'smoke':
        return 'smoke';
      case 'moderate rain':
      return 'moderate-rain';
       case 'light intensity drizzle':
        return 'light-intensity-drizzle';
        case 'thunderstorm with light rain':
        return 'thunderstorm-with-light-rain';
      default:
        return '';

    }
  };

  return (
    <div className={`App ${getBackgroundClass()}`}>
      <Search search={search} setSearch={setSearch} handleSearch={handleSearch} />
      {loading ? (
        <div className='loading'>Loading...</div>
      ) : (
        <div>
          <div className='city-name'>
            <h2>
              {weatherData?.name},<span>{weatherData?.sys?.country}</span>
            </h2>
          </div>
          <div className='date'>
            <span>{getCurrentDate()}</span>
          </div>
          <div className='temp'>{(weatherData?.main?.temp - 273.15).toFixed(2)} °C</div>
          <div className='weather-condition'>
            {weatherData && weatherData.weather && weatherData.weather[0] ? weatherData.weather[0].description : ''}
          </div>
          <div className='weather-info'>
            <div className='column'>
              <div>
                <p className='wind'>{weatherData?.wind?.speed}</p>
                <p>wind speed</p>
              </div>
            </div>
            <div>
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
