import { WeatherTemperaturePooler } from "../pooler/WeatherTemperaturePooler";

import axios from "axios";

jest.mock("axios");
const mockAxios = axios as jest.Mocked<typeof axios>;

describe("Weather temperature pooler", () => {
	afterEach(() => {
		mockAxios.get.mockClear();
	});

	test("Should fetch temperature", async () => {
		mockAxios.get.mockResolvedValue({ data: { name: "city", main: { temp: 100 } } });
		const pooler = new WeatherTemperaturePooler();
		const result = await pooler.getTemperature();

		expect(result).toEqual(100);
		expect(mockAxios.get.mock.calls.length).toEqual(1);
		expect(mockAxios.get.mock.calls[0][0]).toEqual(
			"https://api.openweathermap.org/data/2.5/weather?q=Edinburgh&appid=2d567e25289ca017a464bcba6c011cf1&units=metric&lang=en"
		);
	});
});
