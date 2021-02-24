/* tslint:disable */
/* eslint-disable */
import { PermissionEnum } from './permission-enum';
export interface PermissionIn {
  grants: PermissionEnum;
  read: PermissionEnum;
  role: string;
  share: PermissionEnum;
  view: PermissionEnum;
  write: PermissionEnum;
}
