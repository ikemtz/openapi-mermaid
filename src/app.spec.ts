import { readdirSync, readFileSync, rmdirSync, unlinkSync } from 'fs';
import { IGeneratorOptions } from './models/generator-options';

export function ValidateFiles(options: IGeneratorOptions): void {
  const files = readdirSync(options.outputPath).sort();
  expect(files).toMatchSnapshot();
  files.forEach((file) => {
    const content = readFileSync(`${options.outputPath}${file}`, 'utf8');
    expect(content).toMatchSnapshot(file);
    unlinkSync(`${options.outputPath}${file}`);
  });
  rmdirSync(options.outputPath);
}
/*
 This test is just a place holder so that Jest does not throw the:
  "Your test suite must contain at least one test."
  exception test failure.

  The purpose of this spec file is to serve as a place for 
  common logic for the other unit tests.
*/
describe('Ignore', () => {
  it('1 + 2 should = 3', () => {
    expect(1 + 2).toBe(3);
  });
});
