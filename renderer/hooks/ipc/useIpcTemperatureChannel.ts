import { useIpcChannel } from "./useIpcChannel";

export interface TemperatureResponse {
	value: number | null;
	time?: number;
	error?: string;
}

interface IpcRendererTemperatureChannelResponse {
	cpu: TemperatureResponse;
	weather: TemperatureResponse;
}

/**
 * A typed implementation of the useIpcChannel for the temperature channel
 */
export function useIpcTemperatureChannel(
	onEvent: (params: IpcRendererTemperatureChannelResponse) => void,
	replyChannel?: string
) {
	return useIpcChannel("temperature", onEvent, replyChannel);
}
