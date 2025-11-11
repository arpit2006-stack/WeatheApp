const API_key = "91954dcb0736bfa3f1acd797a1d6b7ae";
let lat, lon;

async function getGeoLoc() {
  const site = document.getElementById("search").value.trim();
  if (!site) {
    alert("Please enter a city name!");
    return;
  }

  const geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${site}&limit=1&appid=${API_key}`;
  const response = await fetch(geoURL);
  const data = await response.json();

  if (!data.length) {
    alert("City not found!");
    return;
  }

  lat = data[0].lat;
  lon = data[0].lon;
  console.log(`Coordinates: ${lat}, ${lon}`);
}

async function getWeather() {
  await getGeoLoc();
  if (!lat || !lon) return;

  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}&units=metric`;
  const response = await fetch(weatherURL);
  const data = await response.json();

  const tempCelsius = data.main.temp;
  console.log(`Temperature: ${tempCelsius}°C`);
  document.getElementById("temp").innerText = `${tempCelsius.toFixed(1)} °C`;
}

document.getElementById("rbtn").addEventListener("click", getWeather);
