import React, { useEffect, useState } from "react";
import { ipcRenderer, IpcRendererEvent } from "electron";

interface Props {}

const App = ({}: Props) => {
	const [temp, setTemp] = useState<number>(0);

	useEffect(() => {
		const timer = setInterval(() => {
			ipcRenderer.send("temperature");
		}, 1000);

		const callback = (event: IpcRendererEvent, { cpu }: { cpu: number }) => {
			setTemp(cpu);
		};

		ipcRenderer.on("temperature", callback);
		return () => {
			clearInterval(timer);
			ipcRenderer.off("temperature", callback);
		};
	}, []);

	return <div>CPU: {temp}</div>;
};

export { App };
