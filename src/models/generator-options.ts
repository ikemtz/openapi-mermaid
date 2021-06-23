/* eslint-disable @typescript-eslint/no-unused-vars */
import { resolve } from 'path';
import { ILogger } from './logger';
import { IEntity, IReferenceProperty, IValueProperty } from './template-data';

export interface IGeneratorOptions {
  logger?: ILogger;
  outputPath: string;
  outputFileName?: string;
  openApiJsonUrl?: string;
  openApiJsonFileName?: string;
  typeFilterCallBack?: (entity: IEntity, index: number, array: IEntity[]) => boolean;
  valuePropertyTypeFilterCallBack?: (valueProperty: IValueProperty, index: number, array: IValueProperty[]) => boolean;
  referencePropertyTypeFilterCallBack?: (referenceProperty: IReferenceProperty, index: number, array: IReferenceProperty[]) => boolean;
  templates?: ITemplates | null;
}
export interface ITemplates {
  htmlClassDiagram?: string;
  mdClassDiagram?: string;
}
export function defaultFilter(
  value: IEntity | IValueProperty | IReferenceProperty,
  index: number,
  array: IEntity[] | IValueProperty[] | IReferenceProperty[],
): boolean {
  return true;
}

export function setGeneratorOptionDefaults(options: IGeneratorOptions): IGeneratorOptions {
  const templateFolder = resolve(`${__dirname}/..`, 'templates');
  options.typeFilterCallBack = options.typeFilterCallBack ?? defaultFilter;
  options.valuePropertyTypeFilterCallBack = options.valuePropertyTypeFilterCallBack ?? defaultFilter;
  options.referencePropertyTypeFilterCallBack = options.referencePropertyTypeFilterCallBack ?? defaultFilter;
  options.templates = {
    ...options.templates,
    mdClassDiagram: options.templates?.mdClassDiagram ?? `${templateFolder}/class-diagram.md.hbs`,
    htmlClassDiagram: options.templates?.htmlClassDiagram ?? `${templateFolder}/class-diagram.html.hbs`,
  };
  return options;
}
