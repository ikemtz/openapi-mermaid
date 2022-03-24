import { mkdirSync } from 'fs';
import { generateDiagrams, nrsrxTypeFilterCallBack, nrsrxValuePropertyTypeFilterCallBack } from '.';
import { ValidateFiles } from './app.spec';
import { IGeneratorOptions } from './models/generator-options';

const accountGenerationOptionsFactory = (): IGeneratorOptions => ({
  openApiJsonUrl: 'https://im-wa-cmpo-nrcrn.azurewebsites.net/swagger/v1/swagger.json',
  outputPath: './jest_output/acct/',
  typeFilterCallBack: nrsrxTypeFilterCallBack,
  valuePropertyTypeFilterCallBack: nrsrxValuePropertyTypeFilterCallBack,
});

describe('Url Based - Full Integration Tests', () => {
  describe('MasterCorp Account Service', () => {
    it('should generate files', async () => {
      const options = accountGenerationOptionsFactory();
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
