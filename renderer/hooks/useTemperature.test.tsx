import { useTemperature } from "./useTemperature";
import { render } from "@testing-library/react";
import React from "react";

let callback: (params: any) => void;
let mockSendEvent = jest.fn();
jest.mock("./ipc/useIpcTemperatureChannel", () => ({
	useIpcTemperatureChannel: (cb: any, replyChannel: string) => {
		callback = cb;
		return { sendEvent: mockSendEvent };
	},
}));

const mockSetState = jest.fn();
jest.mock("react", () => ({
	...jest.requireActual("react"),
	useState: () => [undefined, mockSetState],
}));

function HookComponent({ refresh }: { refresh?: number }) {
	useTemperature(refresh);
	return null;
}

afterEach(() => {
	mockSendEvent.mockClear();
});

test("Should request once when no refresh", () => {
	const { unmount } = render(<HookComponent />);
	unmount();
	expect(mockSendEvent.mock.calls.length).toEqual(1);
});

test("Should request multiple times with refresh", (done) => {
	const { unmount } = render(<HookComponent refresh={10} />);
	setTimeout(() => {
		expect(mockSendEvent.mock.calls.length).toEqual(2);
		unmount();
		done();
	}, 11);
});

test("Should update the state on new data", () => {
	const { unmount } = render(<HookComponent />);
	callback({ weather: { value: 100 }, cpu: { value: 200 } });
	unmount();
	expect(mockSetState.mock.calls.length).toEqual(2);
	expect(mockSetState.mock.calls[0][0]).toEqual({ value: 100 });
	expect(mockSetState.mock.calls[1][0]).toEqual({ value: 200 });
});
