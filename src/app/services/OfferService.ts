import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  searchOffers(searchTerm: string) {
    const params = new HttpParams().set('searchTerm', searchTerm);
    return this.http.get<any>(`${this.apiUrl}api/Offer/SearchOffers`, { params });
  }

  getAllOffers() {
    return this.http.get<any>(`${this.apiUrl}api/Offer/ListOffers`);
  }
}
