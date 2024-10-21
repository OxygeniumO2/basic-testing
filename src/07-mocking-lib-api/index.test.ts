// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => ({
  throttle: jest.fn((fn) => fn),
}));

describe('throttledGetDataFromApi', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const baseUrl = 'https://jsonplaceholder.typicode.com';

    mockedAxios.create.mockReturnValue(mockedAxios);
    mockedAxios.get.mockResolvedValue({ data: {} });

    await throttledGetDataFromApi('/test');

    expect(mockedAxios.create).toHaveBeenCalledWith({ baseURL: baseUrl });
  });

  test('should perform request to correct provided url', async () => {
    const relativePath = '/test';

    mockedAxios.create.mockReturnValue(mockedAxios);
    mockedAxios.get.mockResolvedValue({ data: {} });

    await throttledGetDataFromApi(relativePath);

    expect(mockedAxios.get).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const relativePath = '/test';
    const responseData = [{ test: 2 }];

    mockedAxios.create.mockReturnValue(mockedAxios);
    mockedAxios.get.mockResolvedValue({ data: responseData });

    const result = await throttledGetDataFromApi(relativePath);

    expect(result).toEqual(responseData);
  });
});
