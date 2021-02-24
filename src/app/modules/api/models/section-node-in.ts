/* tslint:disable */
/* eslint-disable */
import { NodeKind } from './node-kind';
export interface SectionNodeIn {
  comment: string;
  description?: string;
  kind: NodeKind;
  name: string;
  parent_id?: number;
}
