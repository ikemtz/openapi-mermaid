import { mkdirSync } from 'fs';
import { generateDiagrams, nrsrxTypeFilterCallBack, nrsrxValuePropertyTypeFilterCallBack } from '.';
import { ValidateFiles } from './app.spec';
import { IGeneratorOptions } from './models/generator-options';
import { IEntity } from './models/template-data';

const messageGenerationOptionsFactory = (): IGeneratorOptions => ({
  openApiJsonFileName: './open-api-spec-docs/mstr-msg.json',
  outputPath: './jest_output/msng/',
  typeFilterCallBack: (val: IEntity, i: number, arr: IEntity[]) =>
    nrsrxTypeFilterCallBack(val, i, arr) && val.name !== 'GetMessageInfoResponse',
  valuePropertyTypeFilterCallBack: nrsrxValuePropertyTypeFilterCallBack,
});

describe('Url Based - Full Integration Tests', () => {
  describe('MasterCorp Messaging Service', () => {
    it('should generate files', async () => {
      const options = messageGenerationOptionsFactory();
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
