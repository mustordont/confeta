/* tslint:disable */
/* eslint-disable */
import { TokenKind } from './token-kind';
export interface GitlabTokenIn {
  description?: string;
  kind: TokenKind;
  provider: string;
  subject: string;
}
