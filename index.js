const container = document.querySelector('.conteiner')
const search = document.querySelector('.search-box button')
const weatherBox = document.querySelector('.weather-box')
const weatherDetails = document.querySelector('.weather-details')
const error404 = document.querySelector('.not-found')

search.addEventListener('click', () => {

	const APIkey = '9353b5a376a032b78d6a676d414822ad';
	const city = document.querySelector('.search-box input').value
	if (city === '')
		return;

	fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`)
		.then(res => res.json())
		.then(json => {
			if (json.cod === '404') {
				container.style.height = '400px';
				weatherBox.style.dispaly = 'none';
				weatherDetails.style.dispaly = 'none'
				error404.style.dispaly = 'block'
				error404.classList.add('fadeIn')
				return;
			}
			error404.style.dispaly = 'none'
			error404.classList.remove('fadeIn')
			const image = document.querySelector('.weather-box img');
			const temperature = document.querySelector('.weather-box .temperature');
			const description = document.querySelector('.weather-box .description');
			const humidity = document.querySelector('.weather-details .humidity span');
			const wind = document.querySelector('.weather-details .wind span');

			switch (json.weather[0].main) {
				case 'Claer':
					image.src = 'image/clear.png'
					break;
				case 'Rain':
					image.src = 'image/rain.png'
					break;

				case 'Snow':
					image.src = 'image/snow.png'
					break;

				case 'Clouds':
					image.src = 'image/cloud.png'
					break;

				case 'Haze':
					image.src = 'image/mist.png'
					break;


				default:
					image.src = '';
			}

			temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</ >`
			description.innerHTML = `${json.weather[0].description}`;
			humidity.innerHTML = `${json.main.humidity}%`
			wind.innerHTML = `${json.wind.speed}Km/s`

			weatherBox.style.display = '';
			weatherDetails.style.display = '';
			weatherBox.classList.add('fadeIn');
			weatherDetails.classList.add('fadeIn');
			container.style.height = '590px';

		})


})