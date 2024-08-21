
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '93b3757281msh06618c540f0062cp15bb76jsn6fa60da44923',
		'x-rapidapi-host': 'weather-api138.p.rapidapi.com'
	}
};
const cityNameElement = document.getElementById('cityName');
const tempElement = document.getElementById('temp');
const feelsLikeElement = document.getElementById('feels_like');
const tempMinElement = document.getElementById('temp_min');
const tempMaxElement = document.getElementById('temp_max');
const humidityElement = document.getElementById('humidity');
const countryElement = document.getElementById('country');
const speedElement = document.getElementById('speed');
const sunriseElement = document.getElementById('sunrise');
const sunsetElement = document.getElementById('sunset');
const dtElement = document.getElementById('dt');
const visibilityElement = document.getElementById('visibility');
const cloudinessElement = document.getElementById('cloudiness');
const rainVolumeElement = document.getElementById('rainVolume');

const fetchcity = (city) => {
	cityName.innerHTML = city;
	fetch('https://weather-api138.p.rapidapi.com/weather?city_name='+ city, options)
		.then(response => response.json())
		.then(response => {
			cityNameElement.innerHTML = response.name;
            tempElement.innerHTML = (response.main.temp - 273.15).toFixed(1);
            feelsLikeElement.innerHTML = (response.main.feels_like - 273.15).toFixed(1);
            tempMinElement.innerHTML = (response.main.temp_min - 273.15).toFixed(1);
            tempMaxElement.innerHTML = (response.main.temp_max - 273.15).toFixed(1);
            humidityElement.innerHTML = response.main.humidity;
            countryElement.innerHTML = response.sys.country;
            speedElement.innerHTML = (response.wind.speed * 3.6).toFixed(1);
            sunriseElement.innerHTML = convertUnixToTime(response.sys.sunrise);
			dtElement.innerHTML = convertUnixToTime(response.dt);
            sunsetElement.innerHTML = convertUnixToTime(response.sys.sunset);
            visibilityElement.innerHTML = (response.visibility/1000);
            cloudinessElement.innerHTML = response.clouds.all;
            rainVolumeElement.innerHTML = response.rain ? response.rain['1h'] :0;

			
			console.log(response)
		})
		.catch(err => console.log(err));

}
function convertUnixToTime(unixTimestamp) {
	const date = new Date(unixTimestamp * 1000);
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const ampm = hours >= 12 ? 'PM' : 'AM';
	const formattedHours = hours % 12 || 12;
	const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
	return `${formattedHours}:${formattedMinutes} ${ampm}`;
}
submit.addEventListener("click", (e) => {
	e.preventDefault();
	fetchcity(city.value);
})
fetchcity("Islamabad");
