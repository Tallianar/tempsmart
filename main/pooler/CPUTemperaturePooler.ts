import si from "systeminformation";
import { TemperaturePooler } from "./TemperaturePooler";

/**
 * Pooler to fetch the current CPU temperature
 * The systeminformation provides a layer for multi-platform support
 */
export class CPUTemperaturePooler extends TemperaturePooler {
	constructor() {
		super(100);
	}

	protected async fetchTemperature() {
		const data = await si.cpuTemperature();
		return data.main;
	}
}
