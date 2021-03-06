import { useEffect, useState } from "react";
import { TemperatureResponse, useIpcTemperatureChannel } from "./ipc/useIpcTemperatureChannel";

/**
 * A hook to get the temperature from the backend.
 * @param refresh milliseconds before sending a request. if not specified there will be only one request.
 * @param replyChannel an optional channel if you want to subscribe to the events of another channel.
 */
export function useTemperature(refresh?: number, replyChannel?: string) {
	const [weather, setWeather] = useState<TemperatureResponse>({ value: null });
	const [cpu, setCPU] = useState<TemperatureResponse>({ value: null });

	const channel = useIpcTemperatureChannel((params) => {
		setWeather(params.weather);
		setCPU(params.cpu);
	}, replyChannel);

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
