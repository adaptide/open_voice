import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly apiBase = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public get<T>(url: string, params: any = {}, headers: {} = {}): Observable<T> {
    const httpParams = this.prepareParams(params);
    return this.http.get<T>(`${this.apiBase}${url}`, {
      params: httpParams,
      headers: this.prepareHeaders(headers)
    });
  }

  public post<T>(url: string, data: any = {}, headers: {} = {}, responseType: 'json' | 'blob' = 'json'): Observable<T> {
    return this.http.post<T>(`${this.apiBase}${url}`, data, {
      headers: this.prepareHeaders(headers),
      responseType: responseType as any
    });
  }

  public put<T>(url: string, data: any = {}, headers: {} = {}): Observable<T> {
    return this.http.put<T>(`${this.apiBase}${url}`, data, {
      headers: this.prepareHeaders(headers)
    });
  }

  public delete<T>(url: string, params: any = {}, headers: {} = {}): Observable<T> {
    const httpParams = this.prepareParams(params);
    return this.http.delete<T>(`${this.apiBase}${url}`, {
      params: httpParams,
      headers: this.prepareHeaders(headers)
    });
  }

  public getBlob(url: string, params: any = {}, headers: {} = {}): Observable<Blob> {
    const httpParams = this.prepareParams(params);
    return this.http.get(`${this.apiBase}${url}`, {
      params: httpParams,
      headers: this.prepareHeaders(headers),
      responseType: 'blob'
    });
  }

  public deleteWithBody<T>(url: string, body: any, headers: {} = {}): Observable<T> {
    return this.http.request<T>('DELETE', `${this.apiBase}${url}`, {
      body: body,
      headers: this.prepareHeaders(headers)
    });
  }

  private prepareParams(params: any): HttpParams {
    let httpParams = new HttpParams();
    Object.keys(params).forEach(key => {
      if (params[key] !== null && params[key] !== undefined) {
        httpParams = httpParams.append(key, params[key]);
      }
    });
    return httpParams;
  }

  private prepareHeaders(customHeaders: {}): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      ...customHeaders
    });
  }
}
