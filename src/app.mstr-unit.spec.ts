import { mkdirSync, readdirSync } from 'fs';
import { generateDiagrams, nrsrxTypeFilterCallBack, nrsrxValuePropertyTypeFilterCallBack } from '.';
import { ValidateFiles } from './app.spec';
import { IGeneratorOptions } from './models/generator-options';
import { MockConsoleLogger } from './models/logger';

const unitGenerationOptionsFactory = (): IGeneratorOptions => ({
  openApiJsonFileName: `${__dirname}/open-api-spec-docs/mstr-unit.json`,
  outputPath: './jest_output/unit/',
  typeFilterCallBack: nrsrxTypeFilterCallBack,
  valuePropertyTypeFilterCallBack: nrsrxValuePropertyTypeFilterCallBack,
});

describe('Url Based - Full Integration Tests', () => {
  describe('MasterCorp Unit Service', () => {
    it('should generate files', async () => {
      const options = unitGenerationOptionsFactory();
      try {
        mkdirSync(options.outputPath, { recursive: true });
      } catch {
        // ignore
      }
      await generateDiagrams(options);
      const files = readdirSync(options.outputPath).sort();
      ValidateFiles(options);
      expect(files).toMatchSnapshot();
    });

    it('should skip formGroup Fac files', async () => {
      const options = {
        ...unitGenerationOptionsFactory(),
        genAngularFormGroups: false,
      };
      try {
        mkdirSync(options.outputPath, { recursive: true });
      } catch {
        // ignore
      }
      await generateDiagrams(options);
      const files = readdirSync(options.outputPath).sort();
      ValidateFiles(options);
      expect(files).toMatchSnapshot();
    });
    it('should not generate files', async () => {
      const options = unitGenerationOptionsFactory();
      options.outputPath = './jest_output/unit_noFiles/';
      try {
        mkdirSync(options.outputPath, { recursive: true });
      } catch {
        // ignore
      }

      await generateDiagrams({
        ...options,
        logger: new MockConsoleLogger(),
        templates: {
          mdClassDiagram: '',
        },
      });
      ValidateFiles(options);
    });
  });
});
