import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
// import { SearchParam } from '../models/search.model';

@Injectable()
export class ProductService {
  private apiUrl:string

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string
  ) { 
    this.apiUrl= baseUrl
  }
  
  getProductList(searchParam: any= null): Observable<any> {
    const url = `${this.apiUrl}products`;
    // const params = this.buildRequestParams(searchParam);

    return this.http.get(url,{}).pipe(
      catchError(err => {
        throw err;
      })
    );
  }

  // private buildRequestParams(searchParam: SearchParam = null): HttpParams {
  //   let params = new HttpParams();

  //   if (searchParam) {
  //     if (searchParam.id) {
  //       params = params.append('id', searchParam.id);
  //     }

  //     if (searchParam.keyword) {
  //       params = params.append('keyword', searchParam.keyword);
  //     }

  //     if (searchParam.size) {
  //       params = params.append('size', searchParam.size);
  //     }

  //     if (searchParam.page) {
  //       params = params.append('page', searchParam.page);
  //     }
  //   }

  //   return params;
  // }
}
