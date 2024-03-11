import { throttledGetDataFromApi } from './index';
import axios from 'axios';
jest.mock('axios');

/*
  good example for global mocking:

  jest.mock('lodash', () => {
    const module = jest.requireActual('lodash');
    module.throttle = jest.fn((fn) => fn);
    return module;
  });
*/

const testResponseData = {
  data: [
    {
      id: 1,
      name: 'Joe Doe',
    },
    {
      id: 2,
      name: 'Jane Doe',
    },
  ],
};

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  beforeEach(() => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    mockedAxios.create = jest.fn(() => mockedAxios);
    mockedAxios.get.mockResolvedValue(testResponseData);
  });

  test('should create instance with provided base url', async () => {
    const baseURL = 'https://jsonplaceholder.typicode.com';

    const axiosCreateSpy = jest.spyOn(axios, 'create');

    await throttledGetDataFromApi('/posts/1');

    jest.runOnlyPendingTimers();
    expect(axiosCreateSpy).lastCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    const axiosCreateSpy = jest.spyOn(axios, 'get');

    await throttledGetDataFromApi('/posts/1');

    jest.runOnlyPendingTimers();
    expect(axiosCreateSpy).lastCalledWith('/posts/1');
  });

  test('should return response data', async () => {
    const res = await throttledGetDataFromApi('/posts/1');

    jest.runOnlyPendingTimers();
    expect(res).toEqual(testResponseData.data);
  });
});
