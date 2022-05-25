/* eslint-disable @typescript-eslint/no-unused-vars */
import { IEntity, IValueProperty } from './template-data';

const edmRegex = /^Edm[A-z]*Kind$/;

export function nrsrxTypeFilterCallBack(val: IEntity, _i: number, _arr: IEntity[]): boolean {
  return !val.name.endsWith('ODataEnvelope') && !edmRegex.test(val.name);
}
export function nrsrxValuePropertyTypeFilterCallBack(val: IValueProperty, _i: number, _arr: IValueProperty[]): boolean {
  return !val.name.startsWith('created') && !val.name.startsWith('updated');
}
