import { useIpcChannel } from "./useIpcChannel";

export interface IpcSetupChannelRequest {
	appId: string;
	city: string;
}
/**
 * A typed implementation of the useIpcChannel for the setup channel
 */
export function useIpcSetupChannel(onEvent: () => void, replyChannel?: string) {
	return useIpcChannel<void, IpcSetupChannelRequest>("setup", onEvent, replyChannel);
}
