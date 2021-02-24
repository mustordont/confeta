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

import { ArrayNodeIn } from '../models/array-node-in';
import { BooleanNodeIn } from '../models/boolean-node-in';
import { Comment } from '../models/comment';
import { LinkNodeIn } from '../models/link-node-in';
import { NodeOut } from '../models/node-out';
import { NodeView } from '../models/node-view';
import { NumberNodeIn } from '../models/number-node-in';
import { SectionNodeIn } from '../models/section-node-in';
import { TextNodeIn } from '../models/text-node-in';

@Injectable({
  providedIn: 'root',
})
export class TreeService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation rootTreeGet
   */
  static readonly RootTreeGetPath = '/tree';

  /**
   * List root nodes.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `rootTreeGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  rootTreeGet$Response(params?: {
  }): Observable<StrictHttpResponse<Array<NodeView>>> {

    const rb = new RequestBuilder(this.rootUrl, TreeService.RootTreeGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<NodeView>>;
      })
    );
  }

  /**
   * List root nodes.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `rootTreeGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  rootTreeGet(params?: {
  }): Observable<Array<NodeView>> {

    return this.rootTreeGet$Response(params).pipe(
      map((r: StrictHttpResponse<Array<NodeView>>) => r.body as Array<NodeView>)
    );
  }

  /**
   * Path part for operation createNodeTreePost
   */
  static readonly CreateNodeTreePostPath = '/tree';

  /**
   * Create new node.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createNodeTreePost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createNodeTreePost$Response(params: {
    body: LinkNodeIn | BooleanNodeIn | NumberNodeIn | TextNodeIn | ArrayNodeIn | SectionNodeIn
  }): Observable<StrictHttpResponse<NodeOut>> {

    const rb = new RequestBuilder(this.rootUrl, TreeService.CreateNodeTreePostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<NodeOut>;
      })
    );
  }

  /**
   * Create new node.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createNodeTreePost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createNodeTreePost(params: {
    body: LinkNodeIn | BooleanNodeIn | NumberNodeIn | TextNodeIn | ArrayNodeIn | SectionNodeIn
  }): Observable<NodeOut> {

    return this.createNodeTreePost$Response(params).pipe(
      map((r: StrictHttpResponse<NodeOut>) => r.body as NodeOut)
    );
  }

  /**
   * Path part for operation viewNodeByIdTreeNodeIdGet
   */
  static readonly ViewNodeByIdTreeNodeIdGetPath = '/tree/{node_id}';

  /**
   * View node by ID.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `viewNodeByIdTreeNodeIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  viewNodeByIdTreeNodeIdGet$Response(params: {
    node_id: number;
  }): Observable<StrictHttpResponse<NodeView>> {

    const rb = new RequestBuilder(this.rootUrl, TreeService.ViewNodeByIdTreeNodeIdGetPath, 'get');
    if (params) {
      rb.path('node_id', params.node_id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<NodeView>;
      })
    );
  }

  /**
   * View node by ID.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `viewNodeByIdTreeNodeIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  viewNodeByIdTreeNodeIdGet(params: {
    node_id: number;
  }): Observable<NodeView> {

    return this.viewNodeByIdTreeNodeIdGet$Response(params).pipe(
      map((r: StrictHttpResponse<NodeView>) => r.body as NodeView)
    );
  }

  /**
   * Path part for operation updateNodeTreeNodeIdPut
   */
  static readonly UpdateNodeTreeNodeIdPutPath = '/tree/{node_id}';

  /**
   * Update existing node.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateNodeTreeNodeIdPut()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateNodeTreeNodeIdPut$Response(params: {
    node_id: number;
    body: LinkNodeIn | BooleanNodeIn | NumberNodeIn | TextNodeIn | ArrayNodeIn | SectionNodeIn
  }): Observable<StrictHttpResponse<NodeOut>> {

    const rb = new RequestBuilder(this.rootUrl, TreeService.UpdateNodeTreeNodeIdPutPath, 'put');
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
        return r as StrictHttpResponse<NodeOut>;
      })
    );
  }

  /**
   * Update existing node.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateNodeTreeNodeIdPut$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateNodeTreeNodeIdPut(params: {
    node_id: number;
    body: LinkNodeIn | BooleanNodeIn | NumberNodeIn | TextNodeIn | ArrayNodeIn | SectionNodeIn
  }): Observable<NodeOut> {

    return this.updateNodeTreeNodeIdPut$Response(params).pipe(
      map((r: StrictHttpResponse<NodeOut>) => r.body as NodeOut)
    );
  }

  /**
   * Path part for operation disableNodeTreeNodeIdDelete
   */
  static readonly DisableNodeTreeNodeIdDeletePath = '/tree/{node_id}';

  /**
   * Delete existing node.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `disableNodeTreeNodeIdDelete()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  disableNodeTreeNodeIdDelete$Response(params: {
    node_id: number;
    body: Comment
  }): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, TreeService.DisableNodeTreeNodeIdDeletePath, 'delete');
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
        return r as StrictHttpResponse<any>;
      })
    );
  }

  /**
   * Delete existing node.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `disableNodeTreeNodeIdDelete$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  disableNodeTreeNodeIdDelete(params: {
    node_id: number;
    body: Comment
  }): Observable<any> {

    return this.disableNodeTreeNodeIdDelete$Response(params).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation viewNodeByPathTreeNodePathGet
   */
  static readonly ViewNodeByPathTreeNodePathGetPath = '/tree/{node_path}';

  /**
   * View node by path.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `viewNodeByPathTreeNodePathGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  viewNodeByPathTreeNodePathGet$Response(params: {
    node_path: string;
  }): Observable<StrictHttpResponse<NodeView>> {

    const rb = new RequestBuilder(this.rootUrl, TreeService.ViewNodeByPathTreeNodePathGetPath, 'get');
    if (params) {
      rb.path('node_path', params.node_path, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<NodeView>;
      })
    );
  }

  /**
   * View node by path.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `viewNodeByPathTreeNodePathGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  viewNodeByPathTreeNodePathGet(params: {
    node_path: string;
  }): Observable<NodeView> {

    return this.viewNodeByPathTreeNodePathGet$Response(params).pipe(
      map((r: StrictHttpResponse<NodeView>) => r.body as NodeView)
    );
  }

}
