/* tslint:disable */
/* eslint-disable */
import { TokenKind } from './token-kind';
export interface KubernetesTokenIn {
  description?: string;
  kind: TokenKind;
  provider: string;
  subject: string;
}
