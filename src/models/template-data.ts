export interface ITemplateData {
  entities?: IEntity[];
  paths: string[];
}
export interface IEntity {
  isEnum?: boolean;
  enumValues: (string | { key?: number; name: string })[];
  name: string;
  importTypes: IImportType[];
  valueProperties: IValueProperty[];
  referenceProperties: IReferenceProperty[];
}
export interface IImportType {
  name: string;
}
export interface IValueProperty {
  name: string;
  type?: string;
  isArray: boolean;
  hasMultipleValidators: boolean;
  required: boolean;
  maxLength?: number;
  minLength?: number;
}

export interface IReferenceProperty {
  name: string;
  referenceTypeName: string;
  isArray: boolean;
  required: boolean;
}
