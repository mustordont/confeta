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

import { NodeHistory } from '../models/node-history';
import { NodeOut } from '../models/node-out';

@Injectable({
  providedIn: 'root',
})
export class OtherService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation viewHistoryHistoryNodeIdGet
   */
  static readonly ViewHistoryHistoryNodeIdGetPath = '/history/{node_id}';

  /**
   * View node history.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `viewHistoryHistoryNodeIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  viewHistoryHistoryNodeIdGet$Response(params: {
    node_id: number;
  }): Observable<StrictHttpResponse<Array<NodeHistory>>> {

    const rb = new RequestBuilder(this.rootUrl, OtherService.ViewHistoryHistoryNodeIdGetPath, 'get');
    if (params) {
      rb.path('node_id', params.node_id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<NodeHistory>>;
      })
    );
  }

  /**
   * View node history.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `viewHistoryHistoryNodeIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  viewHistoryHistoryNodeIdGet(params: {
    node_id: number;
  }): Observable<Array<NodeHistory>> {

    return this.viewHistoryHistoryNodeIdGet$Response(params).pipe(
      map((r: StrictHttpResponse<Array<NodeHistory>>) => r.body as Array<NodeHistory>)
    );
  }

  /**
   * Path part for operation viewLinksLinksNodeIdGet
   */
  static readonly ViewLinksLinksNodeIdGetPath = '/links/{node_id}';

  /**
   * View links to the node.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `viewLinksLinksNodeIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  viewLinksLinksNodeIdGet$Response(params: {
    node_id: number;
  }): Observable<StrictHttpResponse<Array<NodeOut>>> {

    const rb = new RequestBuilder(this.rootUrl, OtherService.ViewLinksLinksNodeIdGetPath, 'get');
    if (params) {
      rb.path('node_id', params.node_id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<NodeOut>>;
      })
    );
  }

  /**
   * View links to the node.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `viewLinksLinksNodeIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  viewLinksLinksNodeIdGet(params: {
    node_id: number;
  }): Observable<Array<NodeOut>> {

    return this.viewLinksLinksNodeIdGet$Response(params).pipe(
      map((r: StrictHttpResponse<Array<NodeOut>>) => r.body as Array<NodeOut>)
    );
  }

}
