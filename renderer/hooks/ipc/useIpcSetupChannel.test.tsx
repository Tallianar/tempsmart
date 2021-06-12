import { mocked } from "ts-jest/utils";
import { ipcRenderer } from "electron";
import { render } from "@testing-library/react";
import React from "react";
import { IpcSetupChannelRequest, useIpcSetupChannel } from "./useIpcSetupChannel";

jest.mock("electron", () => ({ ipcRenderer: { on: jest.fn(), off: jest.fn(), send: jest.fn() } }));
const mockedIpc = mocked(ipcRenderer);
let channel: { sendEvent: (params: IpcSetupChannelRequest) => void };

function HookComponent() {
	channel = useIpcSetupChannel(jest.fn(), "reply-channel");
	return null;
}

test("Should register listener on the right channel", () => {
	const { unmount } = render(<HookComponent />);
	channel.sendEvent({ city: "a", appId: "b" });
	unmount();
	expect(mockedIpc.on.mock.calls.length).toEqual(1);
	expect(mockedIpc.on.mock.calls[0][0]).toEqual("reply-channel");
	expect(mockedIpc.send.mock.calls[0][1]).toEqual({
		replyChannel: "reply-channel",
		city: "a",
		appId: "b",
	});
});
