import { TemperaturePooler } from "./TemperaturePooler";

const fetchMock = jest.fn().mockImplementation(() => 100);

class TestPooler extends TemperaturePooler {
	protected async fetchTemperature(): Promise<number> {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(fetchMock());
			});
		});
	}
}

let pooler: TestPooler;

beforeEach(() => {
	pooler = new TestPooler(50);
});

afterEach(() => {
	fetchMock.mockClear();
});

test("Should fetch on first attempt", async () => {
	const result = await pooler.requestTemperature();
	expect(result).toEqual(100);
	expect(fetchMock).toBeCalledTimes(1);
});

test("Should return a cached value when requesting within cache time", async () => {
	await pooler.requestTemperature();
	await pooler.requestTemperature();
	expect(fetchMock).toBeCalledTimes(1);
});

test("Should return fetch only once when two requests happen concurrently", async () => {
	pooler.requestTemperature();
	await pooler.requestTemperature();
	expect(fetchMock).toBeCalledTimes(1);
});

test("Should fetch new data when requesting outside cache time", async () => {
	await pooler.requestTemperature();

	await new Promise((resolve) => {
		setTimeout(async () => {
			await pooler.requestTemperature();
			expect(fetchMock).toBeCalledTimes(2);
			resolve(true);
		}, 60);
	});
});
