import { useCallback, useEffect } from "react";
import { ipcRenderer } from "electron";

export function useIpcChannel<T, K>(
	name: string,
	replyChannel: string,
	onEvent: (params: T) => void
) {
	const callback = useCallback((event, params) => {
		onEvent(params);
	}, []);

	const sendEvent = useCallback(
		(params?: K) => {
			ipcRenderer.send(name, { replyChannel, ...params });
		},
		[name]
	);

	useEffect(() => {
		ipcRenderer.on(replyChannel, callback);
		return () => {
			ipcRenderer.off(replyChannel, callback);
		};
	}, [replyChannel, callback]);

	return {
		sendEvent,
	};
}
