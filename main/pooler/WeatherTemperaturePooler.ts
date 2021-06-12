import axios from "axios";
import queryString from "querystring";
import { TemperaturePooler } from "./TemperaturePooler";

/**
 * Pooler to fetch the current temperature from the OpenWeatherMap API
 */
export class WeatherTemperaturePooler extends TemperaturePooler {
	public appId: string = "";
	public city: string = "";

	/**
	 * The OWM API free tier offers 1 request every 60 seconds for the current weather endpoint
	 */
	constructor(appId: string, city: string) {
		super(60 * 1000);
		this.appId = appId;
		this.city = city;
	}

	getUrl() {
		const base = `https://api.openweathermap.org/data/2.5/weather`;

		if (!this.appId) {
			throw new Error("OWM AppID not set");
		}

		if (!this.city) {
			throw new Error("OWM City not set");
		}

		const params = {
			q: this.city,
			appid: this.appId,
			units: "metric",
			lang: "en",
		};

		const query = queryString.stringify(params);

		return `${base}?${query}`;
	}

	protected async fetchTemperature() {
		const url = this.getUrl();
		try {
			const { data } = await axios.get(url);
			return data.main.temp;
		} catch (e) {
			throw new Error("Could not fetch OpenWeatherMap Temperature");
		}
	}
}
