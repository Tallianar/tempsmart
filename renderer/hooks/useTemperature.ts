import { useEffect, useState } from "react";
import { useIpcTemperatureChannel } from "./ipc/useIpcTemperatureChannel";

export function useTemperature(replyChannel: string, refresh?: number) {
	const [weather, setWeather] = useState<number>(0);
	const [cpu, setCPU] = useState<number>(0);

	const channel = useIpcTemperatureChannel(replyChannel, (params) => {
		setWeather(params.weather);
		setCPU(params.cpu);
	});

	useEffect(() => {
		channel.sendEvent();

		if (!refresh) {
			return;
		}

		const timer = setInterval(() => {
			channel.sendEvent();
		}, refresh);

		return () => {
			clearInterval(timer);
		};
	}, [channel.sendEvent]);

	return { weather, cpu };
}
