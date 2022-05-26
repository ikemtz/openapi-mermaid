import { mkdirSync } from 'fs';
import { generateDiagrams, nrsrxTypeFilterCallBack, nrsrxValuePropertyTypeFilterCallBack } from '.';
import { ValidateFiles } from './app.spec';
import { IGeneratorOptions } from './models/generator-options';

const adventureWorksOptions = (): IGeneratorOptions => ({
  openApiJsonUrl: 'https://awod.ikemtz.com/swagger/v1/swagger.json',
  outputPath: './jest_output/awod/',
  typeFilterCallBack: nrsrxTypeFilterCallBack,
  valuePropertyTypeFilterCallBack: nrsrxValuePropertyTypeFilterCallBack,
});

describe('Url Based - Full Integration Tests', () => {
  describe('Adventure Works OData Service', () => {
    it('should generate files', async () => {
      const options = adventureWorksOptions();
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
