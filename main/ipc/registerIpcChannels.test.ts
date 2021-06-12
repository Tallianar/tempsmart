import { ipcMain } from "electron";
import { mocked } from "ts-jest/utils";
import { registerIpcChannels } from "./registerIpcChannels";

jest.mock("electron", () => ({ ipcMain: { on: jest.fn() } }));
const mockedIpc = mocked(ipcMain, true);

afterEach(() => {
	mockedIpc.on.mockClear();
});

test("Should register the channels", () => {
	registerIpcChannels();
	expect(mockedIpc.on.mock.calls.length).toEqual(2);
	expect(mockedIpc.on.mock.calls[0][0]).toEqual("setup");
	expect(mockedIpc.on.mock.calls[1][0]).toEqual("temperature");
});
