import { WeatherTemperaturePooler } from "./WeatherTemperaturePooler";

import axios from "axios";

jest.mock("axios");
const mockAxios = axios as jest.Mocked<typeof axios>;
let pooler: WeatherTemperaturePooler;
jest.spyOn(Date.prototype,"getTime").mockImplementation(()=>111)

beforeEach(() => {
	pooler = new WeatherTemperaturePooler("key", "city");
});

afterEach(() => {
	mockAxios.get.mockClear();
});

test("Should fetch temperature", async () => {
	mockAxios.get.mockResolvedValue({ data: { name: "city", main: { temp: 100 } } });
	const result = await pooler.requestTemperature();

	expect(result).toEqual(100);
	expect(mockAxios.get.mock.calls.length).toEqual(1);
	expect(mockAxios.get.mock.calls[0][0]).toEqual(
		"https://api.openweathermap.org/data/2.5/weather?q=city&appid=key&units=metric&lang=en&t=111"
	);
});

test("Should set the correct parameters", async () => {
	const pooler = new WeatherTemperaturePooler("key", "city");
	expect(pooler.city).toEqual("city");
	expect(pooler.appId).toEqual("key");
});

test("Should construct a valid url", async () => {
	expect(pooler.getUrl()).toEqual(
		"https://api.openweathermap.org/data/2.5/weather?q=city&appid=key&units=metric&lang=en&t=111"
	);
});

test("Should throw error on empty key", async () => {
	pooler.appId = "";
	await expect(pooler.requestTemperature()).rejects.toThrowError("OWM AppID not set");
});

test("Should throw error on empty city", async () => {
	pooler.city = "";
	await expect(pooler.requestTemperature()).rejects.toThrowError("OWM City not set");
});

test("Should throw an error if temperature is not available", async () => {
	mockAxios.get.mockRejectedValue({});

	await expect(pooler.requestTemperature()).rejects.toThrowError(
		"Could not fetch OpenWeatherMap Temperature"
	);
	expect(mockAxios.get.mock.calls.length).toEqual(1);
});
