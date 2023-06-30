import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { SearchOffersResponse } from "../models/responseModel/search-offers-response.model";
import { AllOffersResponse } from "../models/responseModel/all-offers-response.model";
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  searchOffers(searchTerm: string) {
    const params = new HttpParams().set('searchTerm', searchTerm);
    return this.http.get<SearchOffersResponse>(`${this.apiUrl}api/Offer/SearchOffers`, { params }).pipe(
      catchError((error) => {
        console.error('An error occurred:', error);
        return throwError('Something went wrong');
      })
    );
  }

  getAllOffers() {
    return this.http.get<AllOffersResponse>(`${this.apiUrl}api/Offer/ListOffers`).pipe(
      catchError((error) => {
        console.error('An error occurred:', error);
        return throwError('Something went wrong');
      })
    );
  }
}
