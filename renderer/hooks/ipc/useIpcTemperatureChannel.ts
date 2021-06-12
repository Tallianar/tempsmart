import { useIpcChannel } from "./useIpcChannel";

interface IpcRendererTemperatureChannelResponse {
	cpu: number;
	weather: number;
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
