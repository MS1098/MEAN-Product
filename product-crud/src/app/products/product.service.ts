import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { Product } from './product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = 'http://localhost:3000/api/products';

  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadProducts() {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      tap(products => this.productsSubject.next(products))
    );
  }

  createProduct(data: Product) {
    return this.http.post<Product>(this.apiUrl, data).pipe(
      tap(newProduct => {
        const current = this.productsSubject.value;
        this.productsSubject.next([newProduct, ...current]);
      })
    );
  }

  updateProduct(id: string, data: Product) {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, data).pipe(
      tap(updated => {
        const current = this.productsSubject.value.map(p =>
          p._id === id ? updated : p
        );
        this.productsSubject.next(current);
      })
    );
  }

  deleteProduct(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const current = this.productsSubject.value.filter(p => p._id !== id);
        this.productsSubject.next(current);
      })
    );
  }

  getProductById(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
}
