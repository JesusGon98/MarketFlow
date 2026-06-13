import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../shared/interfaces/api-response.interface';
import { PaginatedResult, PaginationParams } from '../../shared/interfaces/pagination.interface';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly apiUrl = `${environment.apiUrl}/categories`;

  constructor(private readonly httpClient: HttpClient) {}

  public getAll(params?: PaginationParams): Observable<ApiResponse<PaginatedResult<Category>>> {
    let httpParams = new HttpParams();

    if (params?.page) httpParams = httpParams.set('page', params.page);
    if (params?.limit) httpParams = httpParams.set('limit', params.limit);
    if (params?.search) httpParams = httpParams.set('search', params.search);

    return this.httpClient.get<ApiResponse<PaginatedResult<Category>>>(this.apiUrl, { params: httpParams });
  }

  public getById(id: string): Observable<ApiResponse<Category>> {
    return this.httpClient.get<ApiResponse<Category>>(`${this.apiUrl}/${id}`);
  }

  public create(category: Partial<Category>): Observable<ApiResponse<Category>> {
    return this.httpClient.post<ApiResponse<Category>>(this.apiUrl, category);
  }

  public update(id: string, category: Partial<Category>): Observable<ApiResponse<Category>> {
    return this.httpClient.put<ApiResponse<Category>>(`${this.apiUrl}/${id}`, category);
  }

  public delete(id: string): Observable<ApiResponse<null>> {
    return this.httpClient.delete<ApiResponse<null>>(`${this.apiUrl}/${id}`);
  }
}
