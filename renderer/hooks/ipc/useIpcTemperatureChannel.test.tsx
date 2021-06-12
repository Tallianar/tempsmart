import { mocked } from "ts-jest/utils";
import { ipcRenderer } from "electron";
import { useIpcTemperatureChannel } from "./useIpcTemperatureChannel";
import { render } from "@testing-library/react";
import React from "react";

jest.mock("electron", () => ({ ipcRenderer: { on: jest.fn(), off: jest.fn(), send: jest.fn() } }));
const mockedIpc = mocked(ipcRenderer);
let channel: { sendEvent: () => void };

function HookComponent() {
	channel = useIpcTemperatureChannel("reply-channel", jest.fn());
	return null;
}

test("Should register listener on the right channel", () => {
	const { unmount } = render(<HookComponent />);
	unmount();
	expect(mockedIpc.on.mock.calls.length).toEqual(1);
	expect(mockedIpc.on.mock.calls[0][0]).toEqual("reply-channel");
});
