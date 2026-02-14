import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Http {
  httpClient = inject(HttpClient);
  baseParams:Record<string, string> = {};
  private buildParams(params?: Record<string, string>): HttpParams {
    let httpParams = new HttpParams();

    const merged = { ...this.baseParams, ...params };

    Object.keys(merged).forEach(key => {
      if (merged[key] !== null && merged[key] !== undefined) {
        httpParams = httpParams.set(key, merged[key]);
      }
    });

    return httpParams;
  }

 get<T>(url: string, params?: Record<string, any>): Observable<T> {
   const apiUrl = environment.apiBaseUrl + url;
    return this.httpClient.get<T>(apiUrl, {
      params: this.buildParams(params)
    });
  }
  
}
