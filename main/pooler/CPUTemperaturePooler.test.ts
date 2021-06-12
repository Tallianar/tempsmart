import si from "systeminformation";
import { mocked } from "ts-jest/utils";
import { CPUTemperaturePooler } from "./CPUTemperaturePooler";

jest.mock("systeminformation");
const mockSI = mocked(si, true);

afterEach(() => {
	mockSI.cpuTemperature.mockClear();
});

test("Should get temperature", async () => {
	mockSI.cpuTemperature.mockResolvedValue({ main: 100, cores: [10], max: 1 });

	const pooler = new CPUTemperaturePooler();
	const result = await pooler.requestTemperature();

	expect(mockSI.cpuTemperature.mock.calls.length).toEqual(1);
	expect(result).toEqual(100);
});

test("Should throw an error if temperature is not available", async () => {
	// the types lie. main can be null
	mockSI.cpuTemperature.mockResolvedValue({ main: null } as any);

	const pooler = new CPUTemperaturePooler();
	await expect(pooler.requestTemperature()).rejects.toThrowError(
		"Could not fetch CPU temperature"
	);
	expect(mockSI.cpuTemperature.mock.calls.length).toEqual(1);
});
