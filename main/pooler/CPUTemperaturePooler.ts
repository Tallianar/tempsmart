import si from "systeminformation";

export class CPUTemperaturePooler  {
	 async getTemperature() {
		const data = await si.cpuTemperature();

		return data.main;
	}
}
