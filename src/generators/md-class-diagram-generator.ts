import { IGeneratorOptions } from '../models/generator-options';
import { ITemplateData } from '../models/template-data';
import { BaseGenerator } from './base-generator';

export class MdClassDiagramGenerator extends BaseGenerator<ITemplateData> {
  public readonly GeneratorName = 'MdClassDiagramGenerator';
  constructor(options: IGeneratorOptions) {
    super(options, options.templates?.mdClassDiagram);
  }

  public generate(templateData: ITemplateData): void {
    super.generateFile(`${this.generatorOptions.outputPath}/${this.generatorOptions.outputFileName || 'class-diagram'}.md`, templateData);
  }
}
