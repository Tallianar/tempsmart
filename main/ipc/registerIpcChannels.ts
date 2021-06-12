import { IpcMainTemperatureChannel } from "./IpcMainTemperatureChannel";
import { ipcMain } from "electron";
import { IpcMainSetupChannel } from "./IpcMainSetupChannel";
import { WeatherTemperaturePooler } from "../pooler/WeatherTemperaturePooler";
import { CPUTemperaturePooler } from "../pooler/CPUTemperaturePooler";

export function registerIpcChannels() {
	const weatherPooler = new WeatherTemperaturePooler();
	const cpuPooler = new CPUTemperaturePooler();
	const setupChannel = new IpcMainSetupChannel(weatherPooler);
	const temperatureChannel = new IpcMainTemperatureChannel(cpuPooler, weatherPooler);

	const channels = [setupChannel, temperatureChannel];

	for (const channel of channels) {
		ipcMain.on(channel.getChannel(), channel.handleEvent.bind(channel));
	}
}
