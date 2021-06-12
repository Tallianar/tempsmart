import { ipcMain } from "electron";
import { CPUTemperaturePooler } from "../pooler/CPUTemperaturePooler";
import { WeatherTemperaturePooler } from "../pooler/WeatherTemperaturePooler";

const cpuPooler = new CPUTemperaturePooler();
const weatherPooler = new WeatherTemperaturePooler();

ipcMain.on("temperature", async (event, params) => {
	event.reply("temperature", {
		cpu: await cpuPooler.getTemperature(),
		weather: await weatherPooler.getTemperature(),
	});
});
