import { readFileSync, writeFileSync } from 'fs';
import { compile } from 'handlebars';
import { IGeneratorOptions } from '../models/generator-options';

export abstract class BaseGenerator<TContextSchema> {
  public abstract readonly GeneratorName: string;
  public readonly template?: HandlebarsTemplateDelegate<TContextSchema>;
  public readonly emptyArrayRegex = /, ]/g;
  public constructor(public readonly generatorOptions: IGeneratorOptions, public readonly templateFilePath: string | undefined) {
    if (templateFilePath) {
      const templateSource = readFileSync(templateFilePath, { encoding: 'utf8' });
      this.template = compile(templateSource);
    }
  }

  protected generateFile(outputFilePath: string, context: TContextSchema): string | null {
    if (this.template) {
      try {
        const content = this.template(context).replace(this.emptyArrayRegex, ']');
        writeFileSync(outputFilePath, content, { encoding: 'utf8' });
        return content;
      } catch (err) {
        this.generatorOptions.logger?.error(`Error executing template: ${this.templateFilePath ?? 'undefined'}.`);
        this.generatorOptions.logger?.error(`This is likely an issue with the template.`);
        this.generatorOptions.logger?.error(`Data: ${JSON.stringify(context)}`);
        this.generatorOptions.logger?.error(`Goto: https://github.com/ikemtz/openapi-ts-generator to report an issue if necessary.`);
        this.generatorOptions.logger?.error(err);
        throw err;
      }
    } else {
      this.generatorOptions.logger?.warn(`Template for ${this.GeneratorName} has not been specified`);
    }
    return null;
  }
}
