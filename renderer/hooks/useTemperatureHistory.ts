import { useEffect, useState } from "react";
import { TemperatureResponse } from "./ipc/useIpcTemperatureChannel";
import { useTemperature } from "./useTemperature";

/**
 * Hook to fetch and cache all the temperature values
 */
export function useTemperatureHistory(replyChannel?: string) {
	const [weatherHistory, setWeatherHistory] = useState<TemperatureResponse[]>([]);
	const [cpuHistory, setCpuHistory] = useState<TemperatureResponse[]>([]);

	const data = useTemperature(60 * 1000, replyChannel);

	useEffect(() => {
		setWeatherHistory([...weatherHistory, data.weather]);
	}, [data.weather]);

	useEffect(() => {
		setCpuHistory([...cpuHistory, data.cpu]);
	}, [data.cpu]);

	return { weatherHistory, cpuHistory };
}
