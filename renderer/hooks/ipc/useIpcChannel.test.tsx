import React from "react";
import { ipcRenderer } from "electron";
import { mocked } from "ts-jest/utils";
import { render } from "@testing-library/react";
import { useIpcChannel } from "./useIpcChannel";

jest.mock("electron", () => ({ ipcRenderer: { on: jest.fn(), off: jest.fn(), send: jest.fn() } }));
const mockedIpc = mocked(ipcRenderer);
let channel: { sendEvent: (params: any) => void };
let mockOnEvent = jest.fn();
jest.spyOn(Math, "random").mockImplementation(() => 0.123456);

function HookComponent({ replyChannel }: { replyChannel?: string }) {
	channel = useIpcChannel("test", mockOnEvent, replyChannel);
	return null;
}

afterEach(() => {
	mockedIpc.off.mockClear();
	mockedIpc.on.mockClear();
	mockedIpc.send.mockClear();
	mockOnEvent.mockClear();
});

test("Should register listener on mount", () => {
	const { unmount } = render(<HookComponent />);
	unmount();
	expect(mockedIpc.on.mock.calls.length).toEqual(1);
});

test("Should generate a replyChannel id", () => {
	const { unmount } = render(<HookComponent />);
	unmount();
	expect(mockedIpc.on.mock.calls.length).toEqual(1);
	expect(mockedIpc.on.mock.calls[0][0]).toEqual("test-123456");
});

test("Should use the assigned replyChannel id", () => {
	const { unmount } = render(<HookComponent replyChannel={"test-reply"} />);
	unmount();
	expect(mockedIpc.on.mock.calls.length).toEqual(1);
	expect(mockedIpc.on.mock.calls[0][0]).toEqual("test-reply");
});

test("Should unregister listener on unmount", () => {
	const { unmount } = render(<HookComponent />);
	unmount();
	expect(mockedIpc.off.mock.calls.length).toEqual(1);
});

test("Should send event", () => {
	const { unmount } = render(<HookComponent replyChannel={"reply"} />);
	channel.sendEvent({ test: true });
	unmount();

	expect(mockedIpc.send.mock.calls.length).toEqual(1);
	expect(mockedIpc.send.mock.calls[0][0]).toEqual("test");
	expect(mockedIpc.send.mock.calls[0][1]).toEqual({ replyChannel: "reply", test: true });
});

test("Should send event with the generated replyChannelId", () => {
	const { unmount } = render(<HookComponent />);
	channel.sendEvent({ test: true });
	unmount();

	expect(mockedIpc.send.mock.calls.length).toEqual(1);
	expect(mockedIpc.send.mock.calls[0][0]).toEqual("test");
	expect(mockedIpc.send.mock.calls[0][1]).toEqual({ replyChannel: "test-123456", test: true });
});

test("Should call callback on response", () => {
	// mock the ipc to respond like the server. We catch the callback when setting the listener
	// and we fire it when we send the event passing the same parameters to test the loop
	let callback: any;
	mockedIpc.on.mockImplementation(function (name, cb) {
		callback = cb;
		return undefined as any;
	});

	mockedIpc.send.mockImplementation(function (name, params) {
		callback(undefined, params);
	});

	const { unmount } = render(<HookComponent replyChannel={"reply"} />);
	channel.sendEvent({ test: true });
	unmount();

	expect(mockOnEvent.mock.calls.length).toEqual(1);
	expect(mockOnEvent.mock.calls[0][0]).toEqual({ replyChannel: "reply", test: true });
});
