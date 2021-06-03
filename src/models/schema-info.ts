import { ReferenceObject, SchemaObject } from 'openapi3-ts';
import { defaultFilter, IGeneratorOptions } from './generator-options';
import { IReferenceProperty, IValueProperty } from './template-data';

export class SchemaWrapperInfo {
  public propertySchemaObject: SchemaObject = {};
  public propertyReferenceObject: ReferenceObject = { $ref: '' };

  public readonly componentSchemaObject: SchemaObject;
  public readonly valueProperties: IValueProperty[];
  public referenceProperties: IReferenceProperty[];

  constructor(schemaItem: SchemaObject) {
    this.componentSchemaObject = schemaItem;
    this.valueProperties = [];
    this.referenceProperties = [];
  }

  public updateReferenceProperties(options: IGeneratorOptions): void {
    this.referenceProperties = this.referenceProperties.filter(options.referencePropertyTypeFilterCallBack || defaultFilter);
  }
}
