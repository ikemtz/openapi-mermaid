import { mkdirSync } from 'fs';
import { generateDiagrams, nrsrxTypeFilterCallBack, nrsrxValuePropertyTypeFilterCallBack } from '.';
import { ValidateFiles } from './app.spec';
import { IGeneratorOptions } from './models/generator-options';

const fileEmployeeGenerationOptionsFactory = (): IGeneratorOptions => ({
  openApiJsonFileName: '../src/open-api-spec-docs/nrcrn-empl.json',
  outputPath: './jest_output/empl/',
  typeFilterCallBack: nrsrxTypeFilterCallBack,
  valuePropertyTypeFilterCallBack: nrsrxValuePropertyTypeFilterCallBack,
});

describe('File Based - Full Integration Tests', () => {
  describe('NRSRx Employee OData Microservice', () => {
    const options = fileEmployeeGenerationOptionsFactory();
    it('should generate files', async () => {
      try {
        mkdirSync(options.outputPath, { recursive: true });
      } catch {
        // ignore
      }
      await generateDiagrams(options);
      ValidateFiles(options);
    });
  });
});
