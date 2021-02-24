/* tslint:disable */
/* eslint-disable */
import { NodeOut } from './node-out';
export interface NodeView {
  children?: Array<NodeOut>;
  created_at: string;
  description?: string;
  has_children: boolean;
  id: number;
  kind: string;
  modified_at?: string;
  name: string;
  parent_id?: number;
  path: string;
  value?: number | number | boolean | string | Array<number | number | boolean | string>;
  version: number;
}
