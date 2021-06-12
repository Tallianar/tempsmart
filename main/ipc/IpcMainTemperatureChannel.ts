import { IpcMainEvent } from "electron";
import { CPUTemperaturePooler } from "../pooler/CPUTemperaturePooler";
import { WeatherTemperaturePooler } from "../pooler/WeatherTemperaturePooler";

/**
 * Class to manage the temperature ipc channel.
 * The renderer should request new value and the main will respond with the values from the poolers
 */
export class IpcMainTemperatureChannel {
	private cpuPooler = new CPUTemperaturePooler();
	private weatherPooler = new WeatherTemperaturePooler();

	getChannel() {
		return "temperature";
	}

	async handleEvent(event: IpcMainEvent, params: { replyChannel: string }) {
		// console.log(`[ipc][${this.getChannel()}] -> ${params.replyChannel}`);
		event.reply(params.replyChannel, {
			cpu: await this.cpuPooler.requestTemperature(),
			weather: await this.weatherPooler.requestTemperature(),
		});
	}
}
