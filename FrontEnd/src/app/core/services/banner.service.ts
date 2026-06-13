import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../shared/interfaces/api-response.interface';
import { Banner } from '../models/banner.model';

@Injectable({
  providedIn: 'root',
})
export class BannerService {
  private readonly apiUrl = `${environment.apiUrl}/banners`;

  constructor(private readonly httpClient: HttpClient) {}

  public getAll(): Observable<ApiResponse<Banner[]>> {
    return this.httpClient.get<ApiResponse<Banner[]>>(this.apiUrl);
  }

  public getById(id: string): Observable<ApiResponse<Banner>> {
    return this.httpClient.get<ApiResponse<Banner>>(`${this.apiUrl}/${id}`);
  }

  public create(banner: Partial<Banner>): Observable<ApiResponse<Banner>> {
    return this.httpClient.post<ApiResponse<Banner>>(this.apiUrl, banner);
  }

  public update(id: string, banner: Partial<Banner>): Observable<ApiResponse<Banner>> {
    return this.httpClient.put<ApiResponse<Banner>>(`${this.apiUrl}/${id}`, banner);
  }

  public delete(id: string): Observable<ApiResponse<null>> {
    return this.httpClient.delete<ApiResponse<null>>(`${this.apiUrl}/${id}`);
  }
}
