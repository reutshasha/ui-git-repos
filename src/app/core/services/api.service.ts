import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { GitHubRepository, GitHubSearchResult } from '../../shared/models/GitHubRepository';
import { environment } from '../../../environments/environment';
import { GroceryTransaction } from '../../shared/models/GroceryTransaction';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = environment.SERVER_BASE_API_URL; 

  private http = inject(HttpClient);

  login(username: string, password: string): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}Auth/login`, { username, password });
  }


  // getTransactionsByDateRange(): Observable<GitHubRepository[]> {
  //   return this.http.get<GitHubRepository[]>(`${this.baseUrl}Favorite/GetFavorites`);
  // }
  getTransactionsByDateRange(startDate: string, endDate: string): Observable<GroceryTransaction[]> {
    const params = new HttpParams()
       .set('startDate', startDate)
      .set('endDate', endDate);
    // .set('startDate', startDate.toISOString()) // המרת התאריך לפורמט ISO
    // .set('endDate', endDate.toISOString());   // המרת התאריך לפורמט ISO
      debugger
      console.log('startDate.toISOString()' + startDate );
      // console.log('startDate' + startDate );
    return this.http.get<GroceryTransaction[]>(this.baseUrl + ' Grocery/transactions', { params });
  }

  searchRepositories(query: string, page: number, perPage: number): Observable<GitHubSearchResult> {
    const url = `${this.baseUrl}Repositories/SearchRepositories?query=${query}&page=${page}&per_page=${perPage}`;//TODO: CHANGE TO search/repositories
    return this.http.get<GitHubSearchResult>(url);
  }

  addToFavorites(favorite: GitHubRepository): Observable<GitHubRepository> {
    return this.http.post<GitHubRepository>(`${this.baseUrl}Favorite/AddToFavorite`, favorite);
  }

  getFavorites(): Observable<GitHubRepository[]> {
    return this.http.get<GitHubRepository[]>(`${this.baseUrl}Favorite/GetFavorites`);
  }

  deleteFavorite(favoriteId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/favorites/delete/${favoriteId}`);
  }
}
