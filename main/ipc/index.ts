import { IpcMainTemperatureChannel } from "./IpcMainTemperatureChannel";
import { ipcMain } from "electron";

const temperatureChannel = new IpcMainTemperatureChannel();

const channels = [temperatureChannel];

for (const channel of channels) {
	ipcMain.on(channel.getChannel(), channel.handleEvent.bind(channel));
}
