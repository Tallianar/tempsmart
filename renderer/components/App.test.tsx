import { IpcSetupChannelRequest } from "../hooks/ipc/useIpcSetupChannel";
import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { App } from "./App";
import "@testing-library/jest-dom/extend-expect";

jest.mock("electron", () => ({ ipcRenderer: { on: jest.fn(), off: jest.fn(), send: jest.fn() } }));

// just to avoid loading the whole thing
jest.mock("../data/cities.json", () => []);

// disable apexcharts rendering
jest.mock("react-apexcharts", () => () => null);

const mockSendEvent = jest.fn();
jest.mock("../hooks/ipc/useIpcSetupChannel", () => {
	return {
		useIpcSetupChannel: function (callback: () => void) {
			return {
				sendEvent: (params: IpcSetupChannelRequest) => {
					callback();
					mockSendEvent(params);
				},
			};
		},
	};
});

test("Should change to dashboard after ready", () => {
	const el = render(<App />);
	// fireEvent.change(el.getByLabelText("OpenWeatherMap API Key"), {
	// 	target: { value: "aabb" },
	// });
	fireEvent.change(el.getByLabelText("City"), { target: { value: "bbaa" } });
	fireEvent.click(el.getByText("Start"));

	expect(el.getByTestId("dashboard")).toBeInTheDocument();
	el.unmount();
});
