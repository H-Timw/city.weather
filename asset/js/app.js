//select element need to change
var search = document.getElementById('search-box');
var city = document.getElementById('city');
var country = document.getElementById('country');
var time = document.getElementById('time');
var date = document.getElementById('date');
var tempt = document.getElementById('tempt');
var weatherStatus = document.getElementById('status');
var view = document.getElementById('view');
var wind = document.getElementById('wind-velocity');
var sun = document.getElementById('possibility-of-rain');

search.addEventListener('keyup', (e) => {
  // changeWeatherUI(e.target.value); //search ontime type
  if (e.key === "Enter") {            //use when wanna use enter to search
    changeWeatherUI(e.target.value);
	}
})
async function changeWeatherUI(cityname) {
  //get location of city latitude, longitude
  const cityLocation = `https://api.openweathermap.org/geo/1.0/direct?q=${cityname}&limit=1&appid=29460cf0e991f8837a3d79babd4e6100`
  const data = await fetch(cityLocation).then( res => res.json())
  //use location to get weather
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${data[0].lat}&lon=${data[0].lon}&appid=29460cf0e991f8837a3d79babd4e6100`;
  const weather = await fetch(apiURL).then(res => res.json())
  //change place
  city.innerHTML = data[0].name;
  country.innerHTML = data[0].country;
  //change time
  var date = new Date();
  time.innerHTML = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  date.innerHTML = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`;
  //change temperature
  var temperature = Math.round((weather.main.temp-273 + Number.EPSILON) * 100) / 100
  tempt.innerHTML = `${temperature}°C`;
  //change status
  weatherStatus.innerHTML = `${weather.weather[0].main}`;
  //more infomation
  wind.innerHTML = `${weather.wind.speed} (m/s)`;
  view.innerHTML = `${weather.visibility} (m)`;
  sun.innerHTML = `${weather.clouds.all} (%)`;
  //change background image css
  if(temperature > 20)
  {
    document.documentElement.style.setProperty('--bg-url','url("../imgs/hot.png")');
  } else {
    document.documentElement.style.setProperty('--bg-url','url("../imgs/cold.png")');
  };
}
//default display hanoi
changeWeatherUI('Ha noi');


