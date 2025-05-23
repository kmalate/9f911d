import { GetBlueprintGraph } from "./blueprintGraphServices";


describe('GetBlueprintGraph', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should fetch data successfully', async () => {
    const mockData = { graph: [1, 2, 3] };
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockData)
    });

    const data = await GetBlueprintGraph();
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/api/v1/1/actions/blueprints/1/graph');
    expect(data).toEqual(mockData);
  });

  it('should throw an error if response is not ok', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false
    });

    await expect(GetBlueprintGraph()).rejects.toThrow('Network response was not ok');
  });
});