import { IGeneratorOptions } from '../models/generator-options';
import { ITemplateData } from '../models/template-data';
import { BaseGenerator } from './base-generator';

export class HtmlClassDiagramGenerator extends BaseGenerator<ITemplateData> {
  public readonly GeneratorName = 'HtmlClassDiagramGenerator';
  constructor(options: IGeneratorOptions) {
    super(options, options.templates?.htmlClassDiagram);
  }

  public generate(templateData: ITemplateData): void {
    super.generateFile(`${this.generatorOptions.outputPath}/${this.generatorOptions.outputFileName || 'class-diagram'}.html`, templateData);
  }
}
