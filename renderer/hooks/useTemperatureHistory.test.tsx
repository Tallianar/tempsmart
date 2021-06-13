import { render } from "@testing-library/react";
import React from "react";
import { useTemperatureHistory } from "./useTemperatureHistory";

let returnedValue = { cpu: { value: 100 }, weather: { value: 200 } };

jest.mock("./useTemperature", () => ({
	useTemperature: (refresh: number, replyChannel: string) => {
		return returnedValue;
	},
}));

const mockSetState = jest.fn();
jest.mock("react", () => {
	return {
		...jest.requireActual("react"),
		useState: () => [[], mockSetState],
	};
});

function HookComponent({ refresh }: { refresh?: number }) {
	useTemperatureHistory("reply-channel");
	return null;
}

test("Should update the state with the history", () => {
	const { unmount } = render(<HookComponent />);
	unmount();
	expect(mockSetState.mock.calls.length).toEqual(2);
	expect(mockSetState.mock.calls[0][0]).toEqual([{ value: 200 }]);
	expect(mockSetState.mock.calls[1][0]).toEqual([{ value: 100 }]);
});
