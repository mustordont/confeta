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

import { PermissionIn } from '../models/permission-in';
import { PermissionOut } from '../models/permission-out';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation viewPermissionsPermissionsNodeIdGet
   */
  static readonly ViewPermissionsPermissionsNodeIdGetPath = '/permissions/{node_id}';

  /**
   * List node permissions.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `viewPermissionsPermissionsNodeIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  viewPermissionsPermissionsNodeIdGet$Response(params: {
    node_id: number;
  }): Observable<StrictHttpResponse<Array<PermissionOut>>> {

    const rb = new RequestBuilder(this.rootUrl, PermissionsService.ViewPermissionsPermissionsNodeIdGetPath, 'get');
    if (params) {
      rb.path('node_id', params.node_id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<PermissionOut>>;
      })
    );
  }

  /**
   * List node permissions.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `viewPermissionsPermissionsNodeIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  viewPermissionsPermissionsNodeIdGet(params: {
    node_id: number;
  }): Observable<Array<PermissionOut>> {

    return this.viewPermissionsPermissionsNodeIdGet$Response(params).pipe(
      map((r: StrictHttpResponse<Array<PermissionOut>>) => r.body as Array<PermissionOut>)
    );
  }

  /**
   * Path part for operation createPermissionPermissionsNodeIdPost
   */
  static readonly CreatePermissionPermissionsNodeIdPostPath = '/permissions/{node_id}';

  /**
   * Create new node permission.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createPermissionPermissionsNodeIdPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createPermissionPermissionsNodeIdPost$Response(params: {
    node_id: number;
    body: PermissionIn
  }): Observable<StrictHttpResponse<PermissionOut>> {

    const rb = new RequestBuilder(this.rootUrl, PermissionsService.CreatePermissionPermissionsNodeIdPostPath, 'post');
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
        return r as StrictHttpResponse<PermissionOut>;
      })
    );
  }

  /**
   * Create new node permission.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createPermissionPermissionsNodeIdPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createPermissionPermissionsNodeIdPost(params: {
    node_id: number;
    body: PermissionIn
  }): Observable<PermissionOut> {

    return this.createPermissionPermissionsNodeIdPost$Response(params).pipe(
      map((r: StrictHttpResponse<PermissionOut>) => r.body as PermissionOut)
    );
  }

  /**
   * Path part for operation updatePermissionPermissionsNodeIdPermissionIdPut
   */
  static readonly UpdatePermissionPermissionsNodeIdPermissionIdPutPath = '/permissions/{node_id}/{permission_id}';

  /**
   * Update existing node permission.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updatePermissionPermissionsNodeIdPermissionIdPut()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePermissionPermissionsNodeIdPermissionIdPut$Response(params: {
    node_id: number;
    permission_id: number;
    body: PermissionIn
  }): Observable<StrictHttpResponse<PermissionOut>> {

    const rb = new RequestBuilder(this.rootUrl, PermissionsService.UpdatePermissionPermissionsNodeIdPermissionIdPutPath, 'put');
    if (params) {
      rb.path('node_id', params.node_id, {});
      rb.path('permission_id', params.permission_id, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PermissionOut>;
      })
    );
  }

  /**
   * Update existing node permission.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updatePermissionPermissionsNodeIdPermissionIdPut$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePermissionPermissionsNodeIdPermissionIdPut(params: {
    node_id: number;
    permission_id: number;
    body: PermissionIn
  }): Observable<PermissionOut> {

    return this.updatePermissionPermissionsNodeIdPermissionIdPut$Response(params).pipe(
      map((r: StrictHttpResponse<PermissionOut>) => r.body as PermissionOut)
    );
  }

  /**
   * Path part for operation deletePermissionPermissionsNodeIdPermissionIdDelete
   */
  static readonly DeletePermissionPermissionsNodeIdPermissionIdDeletePath = '/permissions/{node_id}/{permission_id}';

  /**
   * Delete existing node permission.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deletePermissionPermissionsNodeIdPermissionIdDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  deletePermissionPermissionsNodeIdPermissionIdDelete$Response(params: {
    node_id: number;
    permission_id: number;
  }): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, PermissionsService.DeletePermissionPermissionsNodeIdPermissionIdDeletePath, 'delete');
    if (params) {
      rb.path('node_id', params.node_id, {});
      rb.path('permission_id', params.permission_id, {});
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
   * Delete existing node permission.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deletePermissionPermissionsNodeIdPermissionIdDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deletePermissionPermissionsNodeIdPermissionIdDelete(params: {
    node_id: number;
    permission_id: number;
  }): Observable<any> {

    return this.deletePermissionPermissionsNodeIdPermissionIdDelete$Response(params).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

}
