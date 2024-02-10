import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import { readFile } from 'fs/promises';
import { existsSync } from 'fs';
jest.mock('fs');
jest.mock('fs/promises');

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', async () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 5000);

    // fake timers disabled
    expect(callback).not.toHaveBeenCalled();
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 3000);

    // fake timers started
    jest.runAllTimers();

    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, 5000);

    // fake timers disabled
    expect(callback).not.toHaveBeenCalled();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, 3000);

    // call only one loop fake timers
    jest.runOnlyPendingTimers();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    (readFile as jest.Mock).mockReturnValue(Promise.resolve('any resolve'));
    (existsSync as jest.Mock).mockReturnValue(true);

    await readFileAsynchronously('any.file');

    expect(existsSync).toHaveBeenCalled();
    expect(readFile).toHaveBeenCalled();
  });

  test('should return null if file does not exist', async () => {
    (readFile as jest.Mock).mockReturnValue(Promise.resolve('any resolve'));
    (existsSync as jest.Mock).mockReturnValue(false);

    const res = await readFileAsynchronously('wrong.file');

    expect(existsSync).toHaveBeenCalled();
    expect(readFile).not.toHaveBeenCalled();
    expect(res).toBeNull();
  });

  test('should return file content if file exists', async () => {
    (readFile as jest.Mock).mockReturnValue(
      Promise.resolve('readFile mocked!'),
    );
    (existsSync as jest.Mock).mockReturnValue(true);

    const res = await readFileAsynchronously('facked.file');

    expect(existsSync).toHaveBeenCalled();
    expect(readFile).toHaveBeenCalled();
    expect(res).not.toBeNull();
  });
});
