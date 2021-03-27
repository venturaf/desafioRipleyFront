import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) { }
  public getRequest(url): Observable<any> {
    return this.http.get(url).pipe(
      map((res) => res), (err) => err);
  };
  public postRequest(data, url): Observable<any> {
    return this.http.post(url, data).pipe(
      map((res) => res), (err) => err);
  };
}