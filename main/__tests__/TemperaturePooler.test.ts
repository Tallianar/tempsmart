import {TemperaturePooler} from "../pooler/TemperaturePooler";

const fetchMock = jest.fn().mockImplementation(() => 100);

class TestPooler extends TemperaturePooler {
    protected async fetchTemperature(): Promise<number> {
        return fetchMock();
    }
}

describe("TemperaturePooler", () => {
    afterEach(() => {
        fetchMock.mockClear();
    });

    test("Should fetch on first attempt", async () => {
        const pooler = new TestPooler(10);

        const result = await pooler.requestTemperature();
        expect(result).toEqual(100);
        expect(fetchMock).toBeCalledTimes(1);
    });

    test("Should return a cached value when requesting within cache time", async () => {
        const pooler = new TestPooler(10);

        await pooler.requestTemperature();
        await pooler.requestTemperature();
        expect(fetchMock).toBeCalledTimes(1);
    });

    test("Should fetch new data when requesting outside cache time", async () => {
        const pooler = new TestPooler(10);
        await pooler.requestTemperature();
        await pooler.requestTemperature();

        await new Promise((resolve) => {
            setTimeout(async () => {
                await pooler.requestTemperature();
                expect(fetchMock).toBeCalledTimes(2);
                resolve(true);
            }, 20);
        });
    });
});