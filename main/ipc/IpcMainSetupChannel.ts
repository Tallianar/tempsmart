import { WeatherTemperaturePooler } from "../pooler/WeatherTemperaturePooler";
import { IpcMainEvent } from "electron";

interface IpcMainSetupChannelRequest {
	replyChannel: string;
	city: string;
	appId: string;
}

/**
 * Class to manage the setup ipc channel.
 * Listen to the inputs from the setup page and pass them to the OWM pooler
 */
export class IpcMainSetupChannel {
	private weatherPooler;
	constructor(weatherPooler: WeatherTemperaturePooler) {
		this.weatherPooler = weatherPooler;
	}

	getChannel() {
		return "setup";
	}

	async handleEvent(event: IpcMainEvent, params: IpcMainSetupChannelRequest) {
		// console.log(`[ipc][${this.getChannel()}] -> ${params.replyChannel}`);

		this.weatherPooler.city = params.city;
		this.weatherPooler.appId = params.appId;
		event.reply(params.replyChannel);
	}
}
