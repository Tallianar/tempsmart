import si from "systeminformation";
import axios from "axios";
import queryString from "querystring";

export class WeatherTemperaturePooler {
	async getTemperature() {
		const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
		const params = {
			q: "Edinburgh",
			appid: "2d567e25289ca017a464bcba6c011cf1",
			units: "metric",
			lang: "en",
		};

		const query = queryString.stringify(params);
		const { data } = await axios.get(`${baseUrl}?${query}`);
		return data.main.temp;
	}
}
