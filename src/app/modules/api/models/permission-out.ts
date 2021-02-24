/* tslint:disable */
/* eslint-disable */
import { PermissionEnum } from './permission-enum';
export interface PermissionOut {
  created_at: string;
  grants: PermissionEnum;
  id: number;
  modified_at?: string;
  node_id: number;
  read: PermissionEnum;
  role: string;
  share: PermissionEnum;
  view: PermissionEnum;
  write: PermissionEnum;
}
