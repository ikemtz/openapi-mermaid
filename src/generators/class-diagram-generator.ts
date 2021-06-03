import { IGeneratorOptions } from '../models/generator-options';
import { ITemplateData } from '../models/template-data';
import { BaseGenerator } from './base-generator';

export class ClassDiagramGenerator extends BaseGenerator<ITemplateData> {
  public readonly GeneratorName = 'ModelGenerator';
  constructor(options: IGeneratorOptions) {
    super(options, options.templates?.classDiagram);
  }

  public generate(templateData: ITemplateData): void {
    super.generateFile(`${this.generatorOptions.outputPath}/class-diagram.md`, templateData);
  }
}
