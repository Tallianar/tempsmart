import React, { useEffect, useState } from "react";
import { ipcRenderer, IpcRendererEvent } from "electron";

interface Props {}

const App = ({}: Props) => {
	const [weather, setWeather] = useState<number>(0);
	const [cpu, setCPU] = useState<number>(0);

	useEffect(() => {
		const timer = setInterval(() => {
			ipcRenderer.send("temperature");
		}, 1000);

		const callback = (
			event: IpcRendererEvent,
			{ cpu, weather }: { cpu: number; weather: number }
		) => {
			setCPU(cpu);
			setWeather(weather);
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
