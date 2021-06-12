import { ipcMain } from "electron";
import { mocked } from "ts-jest/utils";
import { registerIpcChannels } from "./registerIpcChannels";

jest.mock("electron", () => ({ ipcMain: { on: jest.fn() } }));
const mockedIpc = mocked(ipcMain, true);

afterEach(() => {
	mockedIpc.on.mockClear();
});

test("Should register the temperature channel", () => {
	registerIpcChannels();
	expect(mockedIpc.on.mock.calls.length).toEqual(1);
});
