import { useIpcChannel } from "./useIpcChannel";

export interface IpcCityChannelRequest {
	appId: string;
	query: string;
}

export interface IpcCityChannelResponse {
	cities: string[];
}
/**
 * A typed implementation of the useIpcChannel for the setup channel
 */
export function useIpcCityChannel(
	onEvent: (params: IpcCityChannelResponse) => void,
	replyChannel?: string
) {
	return useIpcChannel<IpcCityChannelResponse, IpcCityChannelRequest>(
		"city",
		onEvent,
		replyChannel
	);
}
