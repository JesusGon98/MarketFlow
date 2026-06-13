import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../shared/interfaces/api-response.interface';
import { PaginatedResult, PaginationParams } from '../../shared/interfaces/pagination.interface';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly apiUrl = `${environment.apiUrl}/products`;

  constructor(private readonly httpClient: HttpClient) {}

  public getAll(params?: PaginationParams & { categoryId?: string }): Observable<ApiResponse<PaginatedResult<Product>>> {
    let httpParams = new HttpParams();

    if (params?.page) httpParams = httpParams.set('page', params.page);
    if (params?.limit) httpParams = httpParams.set('limit', params.limit);
    if (params?.search) httpParams = httpParams.set('search', params.search);
    if (params?.categoryId) httpParams = httpParams.set('categoryId', params.categoryId);

    return this.httpClient.get<ApiResponse<PaginatedResult<Product>>>(this.apiUrl, { params: httpParams });
  }

  public getById(id: string): Observable<ApiResponse<Product>> {
    return this.httpClient.get<ApiResponse<Product>>(`${this.apiUrl}/${id}`);
  }

  public create(product: Partial<Product>): Observable<ApiResponse<Product>> {
    return this.httpClient.post<ApiResponse<Product>>(this.apiUrl, product);
  }

  public update(id: string, product: Partial<Product>): Observable<ApiResponse<Product>> {
    return this.httpClient.put<ApiResponse<Product>>(`${this.apiUrl}/${id}`, product);
  }

  public delete(id: string): Observable<ApiResponse<null>> {
    return this.httpClient.delete<ApiResponse<null>>(`${this.apiUrl}/${id}`);
  }
}
