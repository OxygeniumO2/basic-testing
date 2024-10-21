// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';
import fs from 'fs';
import { readFile } from 'fs/promises';

jest.mock('fs');
jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
}));

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const mockCallback = jest.fn();

    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(mockCallback, 1000);

    expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), 1000);

    setTimeoutSpy.mockRestore();
  });

  test('should call callback only after timeout', () => {
    const mockCallback = jest.fn();

    doStuffByTimeout(mockCallback, 1000);

    expect(mockCallback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1000);

    expect(mockCallback).toHaveBeenCalledTimes(1);
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
    const mockCallback = jest.fn();

    const setIntervalSpy = jest.spyOn(global, 'setInterval');

    doStuffByInterval(mockCallback, 1000);

    expect(setIntervalSpy).toHaveBeenCalledWith(expect.any(Function), 1000);

    setIntervalSpy.mockRestore();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const mockCallback = jest.fn();

    const setIntervalSpy = jest.spyOn(global, 'setInterval');

    doStuffByInterval(mockCallback, 1000);

    jest.advanceTimersByTime(3000);

    expect(mockCallback).toHaveBeenCalledTimes(3);

    setIntervalSpy.mockRestore();
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const joinSpy = jest.spyOn(path, 'join');

    await readFileAsynchronously('test.txt');

    expect(joinSpy).toHaveBeenCalledWith(__dirname, 'test.txt');

    joinSpy.mockRestore();
  });

  test('should return null if file does not exist', async () => {
    fs.existsSync = jest.fn().mockReturnValue(false);

    const result = await readFileAsynchronously('test.txt');

    expect(result).toBe(null);

    expect(fs.readFile).not.toHaveBeenCalled();
  });

  test('should return file content if file exists', async () => {
    fs.existsSync = jest.fn().mockReturnValue(true);
    (readFile as jest.Mock).mockReturnValue('test');

    const result = await readFileAsynchronously('test.txt');

    expect(result).not.toBe(null);
    expect(result).toBe('test');
  });
});
