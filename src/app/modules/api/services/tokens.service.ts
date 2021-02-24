/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { GitlabTokenIn } from '../models/gitlab-token-in';
import { KubernetesTokenIn } from '../models/kubernetes-token-in';
import { LocalTokenIn } from '../models/local-token-in';
import { TokenOut } from '../models/token-out';
import { TokenProviders } from '../models/token-providers';

@Injectable({
  providedIn: 'root',
})
export class TokensService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation tokenProvidersTokensGet
   */
  static readonly TokenProvidersTokensGetPath = '/tokens';

  /**
   * List available token providers.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `tokenProvidersTokensGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  tokenProvidersTokensGet$Response(params?: {
  }): Observable<StrictHttpResponse<TokenProviders>> {

    const rb = new RequestBuilder(this.rootUrl, TokensService.TokenProvidersTokensGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TokenProviders>;
      })
    );
  }

  /**
   * List available token providers.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `tokenProvidersTokensGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  tokenProvidersTokensGet(params?: {
  }): Observable<TokenProviders> {

    return this.tokenProvidersTokensGet$Response(params).pipe(
      map((r: StrictHttpResponse<TokenProviders>) => r.body as TokenProviders)
    );
  }

  /**
   * Path part for operation viewTokensTokensNodeIdGet
   */
  static readonly ViewTokensTokensNodeIdGetPath = '/tokens/{node_id}';

  /**
   * List node access tokens.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `viewTokensTokensNodeIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  viewTokensTokensNodeIdGet$Response(params: {
    node_id: number;
  }): Observable<StrictHttpResponse<Array<TokenOut>>> {

    const rb = new RequestBuilder(this.rootUrl, TokensService.ViewTokensTokensNodeIdGetPath, 'get');
    if (params) {
      rb.path('node_id', params.node_id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<TokenOut>>;
      })
    );
  }

  /**
   * List node access tokens.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `viewTokensTokensNodeIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  viewTokensTokensNodeIdGet(params: {
    node_id: number;
  }): Observable<Array<TokenOut>> {

    return this.viewTokensTokensNodeIdGet$Response(params).pipe(
      map((r: StrictHttpResponse<Array<TokenOut>>) => r.body as Array<TokenOut>)
    );
  }

  /**
   * Path part for operation issueTokenTokensNodeIdPost
   */
  static readonly IssueTokenTokensNodeIdPostPath = '/tokens/{node_id}';

  /**
   * Issue new node access token.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `issueTokenTokensNodeIdPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  issueTokenTokensNodeIdPost$Response(params: {
    node_id: number;
    body: LocalTokenIn | KubernetesTokenIn | GitlabTokenIn
  }): Observable<StrictHttpResponse<TokenOut>> {

    const rb = new RequestBuilder(this.rootUrl, TokensService.IssueTokenTokensNodeIdPostPath, 'post');
    if (params) {
      rb.path('node_id', params.node_id, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TokenOut>;
      })
    );
  }

  /**
   * Issue new node access token.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `issueTokenTokensNodeIdPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  issueTokenTokensNodeIdPost(params: {
    node_id: number;
    body: LocalTokenIn | KubernetesTokenIn | GitlabTokenIn
  }): Observable<TokenOut> {

    return this.issueTokenTokensNodeIdPost$Response(params).pipe(
      map((r: StrictHttpResponse<TokenOut>) => r.body as TokenOut)
    );
  }

  /**
   * Path part for operation revokeTokenTokensNodeIdTokenIdDelete
   */
  static readonly RevokeTokenTokensNodeIdTokenIdDeletePath = '/tokens/{node_id}/{token_id}';

  /**
   * Revoke existing node access token.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `revokeTokenTokensNodeIdTokenIdDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  revokeTokenTokensNodeIdTokenIdDelete$Response(params: {
    node_id: number;
    token_id: number;
  }): Observable<StrictHttpResponse<TokenOut>> {

    const rb = new RequestBuilder(this.rootUrl, TokensService.RevokeTokenTokensNodeIdTokenIdDeletePath, 'delete');
    if (params) {
      rb.path('node_id', params.node_id, {});
      rb.path('token_id', params.token_id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TokenOut>;
      })
    );
  }

  /**
   * Revoke existing node access token.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `revokeTokenTokensNodeIdTokenIdDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  revokeTokenTokensNodeIdTokenIdDelete(params: {
    node_id: number;
    token_id: number;
  }): Observable<TokenOut> {

    return this.revokeTokenTokensNodeIdTokenIdDelete$Response(params).pipe(
      map((r: StrictHttpResponse<TokenOut>) => r.body as TokenOut)
    );
  }

}
