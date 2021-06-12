import { ipcMain } from "electron";
import { CPUTemperaturePooler } from "../pooler/CPUTemperaturePooler";

const pooler = new CPUTemperaturePooler();

ipcMain.on("temperature", async (event, params) => {
	event.reply("temperature", { cpu: await pooler.getTemperature() });
});
