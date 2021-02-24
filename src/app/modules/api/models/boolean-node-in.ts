/* tslint:disable */
/* eslint-disable */
import { NodeKind } from './node-kind';
export interface BooleanNodeIn {
  comment: string;
  description?: string;
  kind: NodeKind;
  name: string;
  parent_id?: number;
  value: boolean;
}
