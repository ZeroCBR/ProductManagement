import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable()
export class ProductService {
  private apiUrl: string;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string
  ) {
    this.apiUrl = baseUrl;
  }

  getProductList(): Observable<Product[]> {
    const url = `${this.apiUrl}api/products`;

    return this.http.get<Product[]>(url).pipe(
      catchError(err => {
        throw err;
      })
    );
  }

  getProduct(id: string): Observable<Product> {
    const url = `${this.apiUrl}api/products/${id}`;

    return this.http.get<Product>(url).pipe(
      catchError(err => {
        throw err;
      })
    );
  }

  createProduct(product: Product): Observable<Product> {
    const url = `${this.apiUrl}api/products`;

    return this.http.post<Product>(url, product).pipe(
      catchError(err => {
        throw err;
      })
    );
  }

  updateProduct(product: Product): Observable<Product> {
    const url = `${this.apiUrl}api/products`;

    return this.http.put<Product>(url, product).pipe(
      catchError(err => {
        throw err;
      })
    );
  }

  deleteProduct(id: string): Observable<string> {
    const url = `${this.apiUrl}api/products/${id}`;

    return this.http.delete(url, {responseType: 'text'}).pipe(
      catchError(err => {
        throw err;
      })
    );
  }

  private handleError (error: Response | any) {
    return Observable.throw(error.json());
  }
}
