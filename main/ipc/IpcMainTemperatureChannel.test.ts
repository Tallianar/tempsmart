import { CPUTemperaturePooler } from "../pooler/CPUTemperaturePooler";
import { WeatherTemperaturePooler } from "../pooler/WeatherTemperaturePooler";
import { IpcMainTemperatureChannel } from "./IpcMainTemperatureChannel";

const mockCPU = jest.spyOn(CPUTemperaturePooler.prototype, "requestTemperature");
const mockOWM = jest.spyOn(WeatherTemperaturePooler.prototype, "requestTemperature");
let channel: IpcMainTemperatureChannel;

beforeEach(() => {
	channel = new IpcMainTemperatureChannel(
		new CPUTemperaturePooler(),
		new WeatherTemperaturePooler()
	);
});

afterEach(() => {
	mockCPU.mockClear();
	mockOWM.mockClear();
});

test("Should send values", async () => {
	mockCPU.mockResolvedValue(100);
	mockOWM.mockResolvedValue(200);

	const replyMock = jest.fn();
	await channel.handleEvent({ reply: replyMock } as any, { replyChannel: "reply" });
	expect(mockCPU.mock.calls.length).toEqual(1);
	expect(replyMock.mock.calls[0][0]).toEqual("reply");
	expect(replyMock.mock.calls[0][1]).toEqual({ cpu: 100, weather: 200 });
});

test("Should get the temperature channel name", async () => {
	expect(channel.getChannel()).toEqual("temperature");
});

test("Should send zero when CPU throws an error", async () => {
	mockCPU.mockRejectedValue(new Error("error"));
	mockOWM.mockResolvedValue(200);

	const replyMock = jest.fn();
	await channel.handleEvent({ reply: replyMock } as any, { replyChannel: "reply" });
	expect(mockCPU.mock.calls.length).toEqual(1);
	expect(replyMock.mock.calls[0][0]).toEqual("reply");
	expect(replyMock.mock.calls[0][1]).toEqual({
		cpu: 0,
		weather: 200,
	});
});

test("Should send zero when OWM throws an error", async () => {
	mockCPU.mockResolvedValue(100);
	mockOWM.mockRejectedValue(new Error("error"));

	const replyMock = jest.fn();
	await channel.handleEvent({ reply: replyMock } as any, { replyChannel: "reply" });
	expect(mockCPU.mock.calls.length).toEqual(1);
	expect(replyMock.mock.calls[0][0]).toEqual("reply");
	expect(replyMock.mock.calls[0][1]).toEqual({
		cpu: 100,
		weather: 0,
	});
});
