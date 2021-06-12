import { useCallback, useEffect, useMemo } from "react";
import { ipcRenderer } from "electron";

/**
 * Generic hook to send events to an Ipc channel and subscribe to replies
 * @param name channel to send events to
 * @param onEvent callback to process replies. Responses will be sent to the replyChannel
 * @param replyChannel channel the reply will be sent to.
 * BEWARE If you subscribe multiple times to the same channel and
 * pass the same replyChannel, all subscription will receive all responses.
 * If no value is provided, a (hopefully) unique channel will be created.
 */
export function useIpcChannel<T, K>(
	name: string,
	onEvent: (params: T) => void,
	replyChannel?: string
) {
	const replyChannelFull = useMemo(() => {
		if (!!replyChannel) {
			return replyChannel;
		}
		const randomId = Math.random().toFixed(6).slice(2);
		return `${name}-${randomId}`;
	}, [replyChannel]);

	const callback = useCallback((event, params) => {
		onEvent(params);
	}, []);

	const sendEvent = useCallback(
		(params?: K) => {
			ipcRenderer.send(name, { replyChannel: replyChannelFull, ...params });
		},
		[name, replyChannelFull]
	);

	useEffect(() => {
		ipcRenderer.on(replyChannelFull, callback);
		return () => {
			ipcRenderer.off(replyChannelFull, callback);
		};
	}, [replyChannelFull, callback]);

	return {
		sendEvent,
	};
}
