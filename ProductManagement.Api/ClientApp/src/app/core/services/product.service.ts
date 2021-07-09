import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import { Product } from '../models/product.model';
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
  
  getProductList(): Observable<Product[]> {
    const url = `${this.apiUrl}products`;

    return this.http.get<Product[]>(url,{}).pipe(
      catchError(err => {
        throw err;
      })
    );
  }
}
