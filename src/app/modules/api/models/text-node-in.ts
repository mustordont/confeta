/* tslint:disable */
/* eslint-disable */
import { NodeKind } from './node-kind';
export interface TextNodeIn {
  comment: string;
  description?: string;
  kind: NodeKind;
  name: string;
  parent_id?: number;
  value: string;
}
