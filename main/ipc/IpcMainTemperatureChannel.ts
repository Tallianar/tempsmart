import { IpcMainEvent } from "electron";
import { CPUTemperaturePooler } from "../pooler/CPUTemperaturePooler";
import { WeatherTemperaturePooler } from "../pooler/WeatherTemperaturePooler";

/**
 * Class to manage the temperature ipc channel.
 * The renderer should request new value and the main will respond with the values from the poolers
 */
export class IpcMainTemperatureChannel {
	private cpuPooler = new CPUTemperaturePooler();
	private weatherPooler = new WeatherTemperaturePooler(
		"2d567e25289ca017a464bcba6c011cf1",
		"Edinburgh"
	);

	getChannel() {
		return "temperature";
	}

	async handleEvent(event: IpcMainEvent, params: { replyChannel: string }) {
		// console.log(`[ipc][${this.getChannel()}] -> ${params.replyChannel}`);

		let cpu;
		try {
			cpu = await this.cpuPooler.requestTemperature();
		} catch (e) {
			cpu = 0;
		}

		let weather;
		try {
			weather = await this.weatherPooler.requestTemperature();
		} catch (e) {
			weather = 0;
		}

		event.reply(params.replyChannel, { cpu, weather });
	}
}
