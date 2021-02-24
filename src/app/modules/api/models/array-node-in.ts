/* tslint:disable */
/* eslint-disable */
import { NodeKind } from './node-kind';
export interface ArrayNodeIn {
  comment: string;
  description?: string;
  kind: NodeKind;
  name: string;
  parent_id?: number;
  value: Array<number | number | boolean | string>;
}
