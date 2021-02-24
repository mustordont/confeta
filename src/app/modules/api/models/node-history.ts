/* tslint:disable */
/* eslint-disable */
import { NodeKind } from './node-kind';
export interface NodeHistory {
  author: string;
  comment: string;
  created_at: string;
  deleted: boolean;
  id: number;
  kind: NodeKind;
  name: string;
  path: string;
  value?: number | number | boolean | string | Array<number | number | boolean | string>;
  version: number;
}
