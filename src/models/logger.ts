export interface ILogger {
  log: (data: string) => void;
  error: (data: string) => void;
  warn: (data: string) => void;
}
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-empty-function */
export class MockConsoleLogger implements ILogger {
  public log = (data: string) => {};
  public error = (data: string) => {};
  public warn = (data: string) => {};
}
