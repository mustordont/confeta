/* tslint:disable */
/* eslint-disable */
import { NodeKind } from './node-kind';
export interface LinkNodeIn {
  comment: string;
  description?: string;
  kind: NodeKind;
  name: string;
  parent_id?: number;
  target: number;
}
