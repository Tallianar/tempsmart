import React, { useEffect, useState } from "react";
import { ipcRenderer, IpcRendererEvent } from "electron";

interface Props {}

const App = ({}: Props) => {
	const [weather, setWeather] = useState<number>(0);
	const [cpu, setCPU] = useState<number>(0);

	useEffect(() => {
		const timer = setInterval(() => {
			ipcRenderer.send("temperature");
		}, 10000);

		ipcRenderer.send("temperature");

		const callback = (
			event: IpcRendererEvent,
			params: { cpu: number; weather: number }
		) => {
			setCPU(params.cpu);
			setWeather(params.weather);
		};

		ipcRenderer.on("temperature", callback);
		return () => {
			clearInterval(timer);
			ipcRenderer.off("temperature", callback);
		};
	}, []);

	return (
		<div>
			<div>CPU: {cpu}</div>
			<div>Weather: {weather}</div>
		</div>
	);
};

export { App };
