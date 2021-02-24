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


@Injectable({
  providedIn: 'root',
})
export class AppService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation renderAppConfigAppConfigGet
   */
  static readonly RenderAppConfigAppConfigGetPath = '/app/config';

  /**
   * Render config.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `renderAppConfigAppConfigGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  renderAppConfigAppConfigGet$Response(params: {
    'X-Auth-Token': string;
  }): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, AppService.RenderAppConfigAppConfigGetPath, 'get');
    if (params) {
      rb.header('X-Auth-Token', params['X-Auth-Token'], {});
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
   * Render config.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `renderAppConfigAppConfigGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  renderAppConfigAppConfigGet(params: {
    'X-Auth-Token': string;
  }): Observable<any> {

    return this.renderAppConfigAppConfigGet$Response(params).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation appConfigAppConfigNodeIdGet
   */
  static readonly AppConfigAppConfigNodeIdGetPath = '/app/config/{node_id}';

  /**
   * Render app config.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `appConfigAppConfigNodeIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  appConfigAppConfigNodeIdGet$Response(params: {
    node_id: number;
  }): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, AppService.AppConfigAppConfigNodeIdGetPath, 'get');
    if (params) {
      rb.path('node_id', params.node_id, {});
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
   * Render app config.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `appConfigAppConfigNodeIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  appConfigAppConfigNodeIdGet(params: {
    node_id: number;
  }): Observable<any> {

    return this.appConfigAppConfigNodeIdGet$Response(params).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

}
