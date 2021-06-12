import axios from "axios";
import queryString from "querystring";
import { TemperaturePooler } from "./TemperaturePooler";

/**
 * Pooler to fetch the current temperature from the OpenWeatherMap API
 */
export class WeatherTemperaturePooler extends TemperaturePooler {
	/**
	 * The OWM API free tier offers 1 request every 60 seconds for the current weather endpoint
	 */
	constructor() {
		super(60 * 1000);
	}

	protected async fetchTemperature() {
		const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
		const params = {
			q: "Edinburgh",
			appid: "2d567e25289ca017a464bcba6c011cf1",
			units: "metric",
			lang: "en",
		};

		const query = queryString.stringify(params);
		console.log(new Date(), "fetch owm");
		const { data } = await axios.get(`${baseUrl}?${query}`);
		return data.main.temp;
	}
}
