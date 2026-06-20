import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { asapScheduler, Observable, observeOn, shareReplay } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../../shared/interfaces/api-response.interface';
import { Store } from '../models/store.model';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private readonly apiUrl = `${environment.apiUrl}/stores`;
  private currentStore$?: Observable<ApiResponse<Store>>;

  constructor(private readonly httpClient: HttpClient) {}

  public getCurrentStore(): Observable<ApiResponse<Store>> {
    if (!this.currentStore$) {
      this.currentStore$ = this.httpClient
        .get<ApiResponse<Store>>(`${this.apiUrl}/${environment.storeId}`)
        .pipe(shareReplay(1));
    }

    return this.currentStore$.pipe(observeOn(asapScheduler));
  }

  public update(storeId: string, store: Partial<Store>): Observable<ApiResponse<Store>> {
    this.currentStore$ = undefined;
    return this.httpClient.put<ApiResponse<Store>>(`${this.apiUrl}/${storeId}`, store);
  }
}
