/* eslint-disable @typescript-eslint/no-unused-vars */
import { IEntity, IValueProperty } from './template-data';

export function nrsrxTypeFilterCallBack(val: IEntity, i: number, arr: IEntity[]): boolean {
  return !val.name.endsWith('ODataEnvelope');
}
export function nrsrxValuePropertyTypeFilterCallBack(val: IValueProperty, i: number, arr: IValueProperty[]): boolean {
  return !val.name.startsWith('created') && !val.name.startsWith('updated');
}
