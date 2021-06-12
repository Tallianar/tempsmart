import { useIpcChannel } from "./useIpcChannel";

interface IpcRendererTemperatureChannelResponse {
	cpu: number;
	weather: number;
}
export function useIpcTemperatureChannel(
	replyChannel: string,
	onEvent: (params: IpcRendererTemperatureChannelResponse) => void
) {
	return useIpcChannel("temperature", replyChannel, onEvent);
}
