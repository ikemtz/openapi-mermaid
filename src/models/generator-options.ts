/* eslint-disable @typescript-eslint/no-unused-vars */
import { resolve } from 'path';
import { ILogger } from './logger';
import { IEntity, IReferenceProperty, IValueProperty } from './template-data';

export interface IGeneratorOptions {
  logger?: ILogger;
  outputPath: string;
  openApiJsonUrl?: string;
  openApiJsonFileName?: string;
  typeFilterCallBack?: (entity: IEntity, index: number, array: IEntity[]) => boolean;
  valuePropertyTypeFilterCallBack?: (valueProperty: IValueProperty, index: number, array: IValueProperty[]) => boolean;
  referencePropertyTypeFilterCallBack?: (referenceProperty: IReferenceProperty, index: number, array: IReferenceProperty[]) => boolean;
  templates?: ITemplates | null;
}
export interface ITemplates {
  classDiagram: string;
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
    classDiagram: options.templates?.classDiagram ?? `${templateFolder}/class-diagram.md.hbs`,
  };
  return options;
}
